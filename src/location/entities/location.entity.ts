import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

@Schema({ _id: false })
export class LocationContent {
  @Prop()
  lat: Number;

  @Prop()
  long: Number;

  @Prop()
  area: string;

  @Prop()
  locality: string;

  @Prop()
  subAdministrativeArea: string;

  @Prop()
  administrativeArea: string;

  @Prop()
  streetName: string;

  @Prop()
  buildingName: string;

  @Prop()
  floorNumber: Number;

  @Prop()
  apartmentNumber: Number;

  @Prop()
  fullAddress: string;

  @Prop()
  knownLandMark: string;

  @Prop()
  phoneNumber: Number;

  @Prop()
  addressAddedTime: string;

  @Prop()
  buildingType: string;

  @Prop()
  isPrimary: Boolean;

  @Prop()
  isLocationPhoneVerified: Boolean;
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
