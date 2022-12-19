import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'; // 1
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {} // 2

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
console.log(email);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
      );
      if(isPasswordMatch){
        return user;
      }
    return null;

    }
    return null;
  }

  async login(loginDto:LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
   
  
    const payload = { username: user.username,email: user.email, sub: user._id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}