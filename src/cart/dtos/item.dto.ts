import { ApiProperty } from "@nestjs/swagger";
import { Max } from "class-validator";

export class ItemDTO {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  name: string;

  @Max(6)
  @ApiProperty()
  quantity: number;
  
  @ApiProperty()
  price: number;

  @ApiProperty()
  extra:[]
}