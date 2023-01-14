import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
export class locationDto {
  @IsNumber()
  @ApiProperty()
  lat: Number;

  @IsNumber()
  @ApiProperty()
  long: Number;

  @IsString()
  @ApiProperty()
  area: string;

  @IsString()
  @ApiProperty()
  locality: string;

  @IsString()
  @ApiProperty()
  subAdministrativeArea: string;

  @IsString()
  @ApiProperty()
  administrativeArea: string;

  @IsString()
  @ApiProperty()
  streetName: string;

  @IsString()
  @ApiProperty()
  buildingName: string;

  @IsNumber()
  @ApiProperty()
  floorNumber: string;

  @IsNumber()
  @ApiProperty()
  apartmentNumber: string;

  @IsString()
  @ApiProperty()
  fullAddress: string;

  @IsString()
  @ApiProperty()
  knownLandMark: string;

  @IsNumber()
  @ApiProperty()
  phoneNumber: Number;

  @IsString()
  @ApiProperty()
  addressAddedTime: string;

  @IsString()
  @ApiProperty()
  buildingType: string;

  @IsBoolean()
  @ApiProperty()
  isPrimary: Boolean;

  @IsBoolean()
  @ApiProperty()
  isLocationPhoneVerified: Boolean;
  
}

export class CreateLocationDto {
  userId: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsObject()
  @IsNotEmptyObject()
  @ApiProperty()
  location: locationDto;
}
