    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExtraDocument = Extra & Document;

@Schema()
export class Extra {
  @Prop()
  arName: string;

  @Prop()
  name: string;

  @Prop()
  formalName: string;

  @Prop()
  price: number;

  @Prop()
  isOptional: Boolean;

  @Prop()
  extraTile: [];




}

export const ExtraSchema = SchemaFactory.createForClass(Extra);

