import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';

export type categoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  arName: string;

  @Prop()
  name: string;

  
  @Prop()
  description: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);