import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'; // 1
import * as bcrypt from 'bcrypt';
import { ActiveDto, LoginDto } from './dto/login-dto';
import { Auth, AuthDocument } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { activeId } from './constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('Auth') private readonly authModel: Model<AuthDocument>,
  ) {} // 2

  async activate(activeDto: ActiveDto): Promise<any> {
    const foundActive =await this.findActive()
    activeDto.isActive= !foundActive.isActive
    const updatedAuth = await this.authModel
    .findByIdAndUpdate(foundActive._id, activeDto, { new: false });
    return updatedAuth;
  }

  async create(activeDto: ActiveDto): Promise<any> {
    const found = await this.authModel.find().exec();
    if(found.length>0) return
    const newAuth = await this.authModel.create(activeDto);
    return newAuth;
  }

  async findActive():Promise<any>{
    const found = await this.authModel.find().exec();
     return found[0]
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
