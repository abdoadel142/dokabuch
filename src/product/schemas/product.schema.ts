import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Extra } from 'src/extras/entities/extra.entity';

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

  // @Prop({  type: SchemaTypes.ObjectId, ref: 'Extra'  })
  // extra: ObjectId;

  @Prop({type:[{ type: SchemaTypes.ObjectId, ref: Extra.name }]})
  extra: ObjectId[];

  @Prop()
  status: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);