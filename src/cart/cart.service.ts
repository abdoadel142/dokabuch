import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dtos/item.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {}

  async createCart(
    userId: string,
    itemDTO: ItemDTO,
    totalPrice: number,
  ): Promise<Cart> {
    itemDTO.id = uuidv4()
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO }],
      totalPrice,
    });
    return newCart;
  }

  async getCart(userId: string): Promise<CartDocument> {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product',
          select: {
            _id: 1,
            name: 1,
            arName: 1,
            description: 1,
            arDescription: 1,
            price: 1,
            category: 1,
            image: 1,
            limit: 1,
            status: 1,
          },
          populate: [
            {
              path: 'category',
              model: 'Category',
            },
          ],
        },
      })
      .populate({
        path: 'items',
        populate: {
          path: 'extra',
          model: 'Extra',
        },
      });
    return cart;
  }

  async deleteCart(userId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userId });
    return deletedCart;
  }

  private recalculateCart(cart: Cart) {
    cart.totalPrice = 0;
    if (cart.items.length > 0) {
      cart.items.forEach(async (item) => {
        if (item.quantity > 0) {
          if (item.extra.length > 0) {
            item.extra.forEach(async (extra) => {
              cart.totalPrice += extra['price'] * item.quantity;
              if (extra['extraTile'].length > 0) {
                extra['extraTile'].forEach((tile) => {
                  cart.totalPrice += tile.price * item.quantity;
                });
              }
            });
          }
          cart.totalPrice += item.quantity * item.product['price'];
          console.log("ddddddddddddddddddddd",cart.totalPrice);
          
        } else {
          await this.removeItemFromCart(cart.userId, item.id);
        }
      });
    }
  }

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { product, quantity, id = uuidv4() } = itemDTO;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.id == id);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.items.push(itemDTO);
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      const newCart = await this.createCart(userId, itemDTO, 0);
      const myCart = await this.getCart(newCart.userId);

      this.recalculateCart(myCart);

      return myCart.save();
    }
  }

  async updateItemFromCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { product, quantity, id } = itemDTO;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.id == id);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(quantity);
        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        let updatedCart = await cart.save();
        return updatedCart;
      } else {
        throw new HttpException('item not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('not found cart', HttpStatus.NOT_FOUND);
    }
  }

  async removeItemFromCart(userId: string, id: string): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex((item) => item.id == id);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      this.recalculateCart(cart);
      return cart.save();
    }
  }
}
