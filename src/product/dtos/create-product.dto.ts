import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

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
  extra: string
}