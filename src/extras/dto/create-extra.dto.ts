import { ApiProperty } from "@nestjs/swagger";

export class CreateExtraDto {
   
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    price: number;
  

}
