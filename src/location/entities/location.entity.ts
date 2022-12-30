import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

@Schema({ _id: false })
export class LocationContent {
  @Prop()
  lat: Number;

  @Prop()
  long: Number;
}

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  address: string;

  @Prop()
  name: string;

  @Prop({ required: true, type: LocationContent })
  location: LocationContent;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
