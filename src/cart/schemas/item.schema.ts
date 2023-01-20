import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Extra } from 'src/extras/entities/extra.entity';

export type ItemDocument = Item & Document;

@Schema()
export class Item {

  @Prop()
  id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  product: string;

  @Prop()
  quantity: number;


  @Prop({type:[{ type: SchemaTypes.ObjectId, ref: Extra.name }]})
  extra: ObjectId[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);