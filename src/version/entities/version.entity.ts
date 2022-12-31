import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VersionDocument = Version & Document;

@Schema()
export class Version {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop()
  version: Number;
}

export const VersionSchema = SchemaFactory.createForClass(Version);
