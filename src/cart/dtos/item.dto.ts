import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class ItemDTO {
  id: string;

  @IsString()
  @ApiProperty()
  product: string;

  @Max(6)
  @Min(0)
  @ApiProperty()
  quantity: number;


  @ApiProperty()
  extra:[]
}