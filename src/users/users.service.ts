import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdminInput } from './dto';
import Role from 'src/enums/roles.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)  private userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneUser(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
  async createAdmin(createAdminInput: CreateAdminInput) {
    const password = await bcrypt.hash(createAdminInput.password, 10);
    createAdminInput['role'] = Role.ADMIN
    const user = new this.userModel({...createAdminInput,password});
    return user.save();
  }


  async delete(deleteUser:string):Promise<User> {
    const user = await this.userModel.findByIdAndDelete(deleteUser);
    return user;
  }


}
