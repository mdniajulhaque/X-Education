import { CreateCourse } from '../entities';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput extends CreateCourse {

  @Field(() => String)
  courseId: string;
}
