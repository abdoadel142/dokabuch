import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Cart } from 'src/cart/schemas/cart.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cart' })
  cart: ObjectId;

  @Prop()
  address: string; 
  
  
  @Prop()
  status: string; 

}

export const OrderSchema = SchemaFactory.createForClass(Order);