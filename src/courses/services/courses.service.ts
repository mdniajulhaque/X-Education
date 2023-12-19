import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../entities/course.entity';
import { CreateCourse } from '../entities';
import { ObjectId } from "mongodb";
import { AllCoursesList, CreateCourseResponse, PaginationInput, UpdateCourseInput } from '../dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(
    createCourse: CreateCourse,
    adminUserId: string,
  ): Promise<CreateCourseResponse> {
    try {
     createCourse['creatorAdminUserId'] = new ObjectId(adminUserId);

     const newCourse = await this.courseModel.create(createCourse);
   
    return {newCourse,success : true,message :"The course has been added successfully"}

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

  async updateCourse(updateCourseInput: UpdateCourseInput,adminUserId:string): Promise<Course> {
    try {
      const {courseId,...updateField} = updateCourseInput
      updateField['editorAdminUserId'] = new ObjectId(adminUserId)
      return await this.courseModel.findByIdAndUpdate(courseId,updateField,{new:true});
    } catch (error) {
      throw new InternalServerErrorException('Course Cannot Updated ' + error);
    }
  }


  async deleteCourse(courseId: string): Promise<Course> {
    try {
      return await this.courseModel.findByIdAndDelete(courseId);
    } catch (error) {
      throw new InternalServerErrorException('Course Cannot Delete ' + error);
    }
  }
}
