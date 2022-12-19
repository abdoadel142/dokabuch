import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    const salt: string = bcrypt.genSaltSync(10);
  
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return newUser.save();
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email: email});
    return user;
  }
}
