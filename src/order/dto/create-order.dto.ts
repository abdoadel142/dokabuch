import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsString()   
    userId: string;

    @ApiProperty()
    @IsString()
    cart: string;
  
    @ApiProperty()
    @IsString()
    address: string;    
    
    @ApiProperty()
    @IsString()
    status: string;
    
    @ApiProperty()
    @IsString()
    date:string
}


