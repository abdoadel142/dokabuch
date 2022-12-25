import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Cart } from 'src/cart/schemas/cart.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  cart: Cart;

  @Prop()
  address: string; 
  

}

export const OrderSchema = SchemaFactory.createForClass(Order);