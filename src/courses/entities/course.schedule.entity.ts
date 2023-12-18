import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { ClassDays, Currency } from '../enums';

@Schema({ _id: false })
@ObjectType('Course_Schedule_Output')
@InputType('Course_ScheduleInput')
export class CourseSchedule {

  @Prop({ type: Date, required: true })
  @Field(() => Date)
  startDate: Date;

  @Prop({ type: Date, required: true })
  @Field(() => Date)
  endDate: Date;

  @Prop({ type: [ClassDays], required: true })
  @Field(() => [ClassDays])
  classDays: ClassDays[];

  @Prop({ type: String, required: true })
  @Field(() => String)
  classTime: string;
}
