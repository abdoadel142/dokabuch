import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;


  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  category: ObjectId;
  

  @Prop()
  image: string;


  @Prop()
  limit: number;


}

export const ProductSchema = SchemaFactory.createForClass(Product);