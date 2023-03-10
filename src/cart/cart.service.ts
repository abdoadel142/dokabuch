import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDTO } from './dtos/item.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<CartDocument>) { }

  async createCart(userId: string, itemDTO: ItemDTO, subTotalPrice: number, totalPrice: number): Promise<Cart> {
    const newCart = await this.cartModel.create({
      userId,
      items: [{ ...itemDTO, subTotalPrice }],
      totalPrice
    });
    return newCart;
  }

  async getCart(userId: string): Promise<CartDocument> {    
    const cart = await this.cartModel.findOne({ userId });
    return cart;  
  
    
  }

  async deleteCart(userId: string): Promise<Cart> {
    const deletedCart = await this.cartModel.findOneAndRemove({ userId });
    return deletedCart;
  }

  private recalculateCart(cart: Cart) {
    
    cart.totalPrice = 0;
    if(cart.items.length>0){
      cart.items.forEach(async item => {
        if(item.quantity > 0){        
          if(item['extras'].length>0){   
            item['extras'].forEach(async extra => {
              cart.totalPrice += (extra.price * item.quantity) ;
              if(extra.extraTile.length>0){
                extra.extraTile.forEach(tile=>{
                  cart.totalPrice += (tile.price * item.quantity) ;
                })
              }
            })
          }
          cart.totalPrice += (item.quantity * item.price);
        }else{                  
          await this.removeItemFromCart(cart.userId,item.id)
        }
      })
    }
   
  }

  async addItemToCart(userId: string, itemDTO: ItemDTO): Promise<Cart> {
    const { productId, quantity, price,id = uuidv4() } = itemDTO;
    const subTotalPrice = quantity * price;

    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.id == id);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {        
        cart.items.push({ ...itemDTO, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      const newCart = await this.createCart(userId, itemDTO, subTotalPrice, price);
      this.recalculateCart(newCart);

      return newCart;
    }
  }
  
  async updateItemFromCart(userId: string, itemDTO: ItemDTO): Promise<Cart> { 
    const { productId, quantity, id} = itemDTO;
    
    const cart = await this.getCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.id == id);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        let updatedCart = await cart.save();
        return updatedCart
        
      } else {
        throw new HttpException("item not found",HttpStatus.NOT_FOUND)

      }
    } else {
     throw new HttpException("not found cart",HttpStatus.NOT_FOUND)
    }
  }

  async removeItemFromCart(userId: string, id: string): Promise<any> {
    const cart = await this.getCart(userId);

    const itemIndex = cart.items.findIndex((item) => item.id == id);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      this.recalculateCart(cart)
      return cart.save();
    }
  }
}