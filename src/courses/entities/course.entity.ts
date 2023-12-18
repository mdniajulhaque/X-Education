import { ObjectType, Field} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from "mongodb";
import { CreateCourse } from '.';
export type CourseDocument = Course & Document;

@Schema({timestamps:true})
@ObjectType()
export class Course extends CreateCourse{

    @Field(type => String, { nullable : true})
    @Prop({ type: ObjectId})
    creatorAdminUserId?: ObjectId

    @Field(type => String, { nullable : true})
    @Prop({ type: ObjectId})
    editorAdminUserId?: ObjectId

 }

export const CourseSchema = SchemaFactory.createForClass(Course);