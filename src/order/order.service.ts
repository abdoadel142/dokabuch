import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.orderModel.create(createOrderDto);
    return newOrder.save();
  }

  async findAll(user: User): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ userId: user.userId })
      .populate({
        path: 'cart',
        populate: {
          path: 'items.extra',
          model: 'Extra',
        },
      })
      .populate('userId')
      .exec();
    return orders;
  }

  async findAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel
      .find()
      .populate({
        path: 'cart',
        populate: {
          path: 'items.extra',
          model: 'Extra',
        },
      })
      .populate('userId')
      .exec();
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    var foundedId = new mongoose.Types.ObjectId(id);
    const order = await this.orderModel
      .findById(foundedId)
      .populate({
        path: 'cart',
        populate: {
          path: 'items.extra',
          model: 'Extra',
        },
      })
      .populate('userId')
      .exec();
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      foundedId,
      updateOrderDto,
      { new: true },
    );
    return updatedOrder;
  }

  async remove(id: number): Promise<any> {
    var foundedId = new mongoose.Types.ObjectId(id);
    const deletedOrder = await this.orderModel.findByIdAndRemove(foundedId);
    return deletedOrder;
  }
}
