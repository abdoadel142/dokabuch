import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

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
  image: string;

  @ApiProperty()
  limit:number;
  
  @ApiProperty()
  extra: string
}