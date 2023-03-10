import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {

  @ApiProperty()
  @IsString()
  arName: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
  
  @ApiProperty()
  @IsString()
  arDescription: string;
  
  @ApiProperty()
  @IsNumber()
  price: number;
  
  @ApiProperty()
  @IsString()
  category: string;
  
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNumber()
  limit:number;
  
  @IsNotEmpty()
  @ApiProperty()
  extra: string[]

  @ApiProperty()
  @IsString()
  status: string;

}