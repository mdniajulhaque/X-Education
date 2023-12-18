import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)  private userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(createUserInput: CreateUserInput) {
    const password = await bcrypt.hash(createUserInput.password, 10);
    const user = new this.userModel({...createUserInput,password});
    return user.save();
  }
  async delete(deleteUser:string):Promise<User> {
    const user = await this.userModel.findByIdAndDelete(deleteUser);
    return user;
  }


}
