import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Currency } from '../enums';

@Schema({ _id: false })
@ObjectType('Course_Price_Output')
@InputType('Course_Price_Input')
export class CoursePrice {

  @Prop({ type: Number, required: true })
  @Field(() => Int, { defaultValue: 0 })
  amount: number;

  @Prop({ type: String, enum:Currency, required: true })
  @Field(() => Currency)
  currency: Currency;
}
