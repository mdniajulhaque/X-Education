import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdminInput } from './dto';
import Role from 'src/enums/roles.enum';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)  private userModel: Model<CourseDocument>
  ) {}

  async findAll(): Promise<Course[]> {
    return this.userModel.find().exec();
  }

  async findOneUser(email: string): Promise<Course> {
    return await this.userModel.findOne({ email }).exec();
  }
  
  async createAdmin(createAdminInput: CreateAdminInput) {
    try{
    const password = await bcrypt.hash(createAdminInput.password, 10);
    createAdminInput['role'] = Role.ADMIN
    const user = new this.userModel({...createAdminInput,password});
    return user.save();
    }catch(error)
    {
      throw new InternalServerErrorException("Admin Cannot Created " + error);
      
    }
  }


  async delete(deleteUser:string):Promise<Course> {
    const user = await this.userModel.findByIdAndDelete(deleteUser);
    return user;
  }


}
