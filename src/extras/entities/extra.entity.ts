    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExtraDocument = Extra & Document;

@Schema()
export class Extra {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  tile: Object;

}

export const ExtraSchema = SchemaFactory.createForClass(Extra);

