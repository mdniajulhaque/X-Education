import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../entities/course.entity';
import { CreateCourse } from '../entities';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)  private courseModel: Model<CourseDocument>
  ) {}

  async createCourse(createCourse:CreateCourse): Promise<Course> {
    try{

      return await this.courseModel.create(createCourse)

    }catch(error)
    {
      throw new InternalServerErrorException("Course Cannot Created " + error);
      
    }
  
  }
 

  // async delete(deleteUser:string):Promise<Course> {
  //   const user = await this.userModel.findByIdAndDelete(deleteUser);
  //   return user;
  // }


}
