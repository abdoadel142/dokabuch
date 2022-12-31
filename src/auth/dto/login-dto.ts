import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(8)
    password: string;


}

export class ActiveDto {
    isActive: Boolean;
}