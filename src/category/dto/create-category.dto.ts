
import { ApiProperty } from "@nestjs/swagger";
import {IsString } from "class-validator";

export class CreateCategoryDto {

  @ApiProperty()
  @IsString()
  arName: string;

  @ApiProperty()
  @IsString()
  name: string;

 
  @ApiProperty()
  @IsString()
  description: string;
  
}