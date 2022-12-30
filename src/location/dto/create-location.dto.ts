import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmptyObject, IsNumber, IsObject, IsString } from 'class-validator';
class locationDto {
  @IsNumber()
  @ApiProperty()
  lat: number;

 @IsNumber()
 @ApiProperty()
 long: number 
}

export class CreateLocationDto {
  userId:string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsObject()
  @IsNotEmptyObject()
  @ApiProperty()
  location: locationDto ;
}


