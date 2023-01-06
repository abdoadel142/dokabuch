import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, MinLength } from "class-validator";
import { Role } from "src/auth/enums/role.enum";

export class CreateUserDTO {
  @ApiProperty()
  username: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @ApiProperty()
  password: string;

  @ApiProperty()
  userToken: string;
  
  @ApiProperty()
  roles: string[];
}