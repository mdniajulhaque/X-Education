import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../entities/course.entity';
import { CreateCourse } from '../entities';
import { ObjectId } from "mongodb";
import { AllCoursesList, PaginationInput } from '../dto';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(
    createCourse: CreateCourse,
    adminUserId: string,
  ): Promise<Course> {
    try {
      createCourse['creatorAdminUserId'] = new ObjectId(adminUserId);

      return await this.courseModel.create(createCourse);
    } catch (error) {
      throw new InternalServerErrorException('Course Cannot Created ' + error);
    }
  }

  async allCourseList(
    paginationInput: PaginationInput,
  ): Promise<AllCoursesList> {
    try {
      const { perPage, pageNumber } = paginationInput;

      const skip = (pageNumber - 1) * perPage;

      const coursesList = await this.courseModel.aggregate([
        {
          $skip: skip,
        },
        {
          $limit: perPage,
        },
      ]);
      const totalCourse = await this.courseModel.countDocuments();
      const response = { coursesList, totalCourse };

      return response;
    } catch (error) {
      throw new NotFoundException('Course List Not Found' + error);
    }
  }

  async getCourseById(courseId: string): Promise<Course> {
    try {
      return await this.courseModel.findById(courseId);
    } catch (error) {
      throw new NotFoundException('Course Not Found' + error);
    }
  }
  // async delete(deleteUser:string):Promise<Course> {
  //   const user = await this.userModel.findByIdAndDelete(deleteUser);
  //   return user;
  // }
}
