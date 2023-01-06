import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max } from "class-validator";

export class ItemDTO {
  @IsString()
  id: string;

  @IsString()
  @ApiProperty()
  productId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @Max(6)
  @ApiProperty()
  quantity: number;
  
  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  extra:[]
}