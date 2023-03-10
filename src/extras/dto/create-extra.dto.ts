import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateExtraDto {
    @ApiProperty()
    @IsString()
    arName: string;
  
    @ApiProperty()
    @IsString()
    name: string;
  
    @IsNumber()
    @ApiProperty()
    price: number;
  
    @IsString()
    @ApiProperty()
    formalName: string;
  
    @IsBoolean()
    @ApiProperty()
    isOptional: Boolean;
  
    
    @ApiProperty()
    extraTile: Object;
}
