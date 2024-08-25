import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new this.userModel({ ...user, password: hashedPassword });
      return newUser.save();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }
}
