import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Course } from '../entities';

@ObjectType()
export class AllCoursesList {

  @Field(()=> [Course],{nullable:true})
  coursesList?: Course[];

  @Field(()=>Int,{defaultValue:0})
  totalCourse: number;
}

