import { ObjectType, Field, InputType} from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { CourseLevelEnum } from '../enums';
import { CoursePrice, CourseSchedule } from '.';

@Schema({_id:false})
@ObjectType('Create_Course_Output')
@InputType('Create_Course_Input')
export class CreateCourse {

  @Prop({type:String,required:true})      
  @Field(()=>String)
  name: string;

  @Prop({type:String,required:true})
  @Field(()=>String)
  description: string;

  @Prop({type:CoursePrice,required:true})
  @Field(() => CoursePrice,{nullable:true})
  price?: CoursePrice;


  @Prop({type:String})
  @Field(() => String)
  duration: string;


  @Prop({type:String,enum:CourseLevelEnum,required:true})
  @Field(() => CourseLevelEnum)
  level: CourseLevelEnum;


  @Prop({type:[String],required:true})
  @Field(() => [String])
  topics?: string[];


  @Prop({type:CourseSchedule,required:true})
  @Field(() => CourseSchedule)
  schedule?: CourseSchedule;
}