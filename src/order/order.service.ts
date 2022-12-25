import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) { }

  async create(createOrderDto: CreateOrderDto) : Promise<Order> {
    const newOrder = await this.orderModel.create(createOrderDto);
    return newOrder.save();
  }

  async findAll() : Promise<Order[]> {
    const orders = await this.orderModel.find().populate('Cart').populate('User').exec();
    return orders;
  }

  async findOne(id: number)  : Promise<Order> {
    const order = await this.orderModel.findById(id).populate('Cart').populate('User').exec();
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) :Promise<Order>{
    const updatedOrder = await this.orderModel
    .findByIdAndUpdate(id, updateOrderDto, { new: true });
  return updatedOrder;  }

  async remove(id: number) 
    : Promise<any> {
      var foundedId = new mongoose.Types.ObjectId(id);
      const deletedOrder = await this.orderModel.findByIdAndRemove(foundedId);
      return deletedOrder;  }
}
