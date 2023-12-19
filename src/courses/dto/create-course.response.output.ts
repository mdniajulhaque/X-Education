import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from '../entities';

@ObjectType()
export class CreateCourseResponse {

  @Field(()=> Course,{nullable:true})
  newCourse?: Course;

  @Field(()=>Boolean,{defaultValue:false})
  success: boolean;

  @Field(()=> String,{defaultValue:"The course Creation Failed"})
  message: string;
}

