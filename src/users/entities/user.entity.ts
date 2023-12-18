import { ObjectType, Field, Int, ResolveProperty } from '@nestjs/graphql';
import Role from 'src/enums/roles.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
@ObjectType()
export class User {

  @Prop()
  @Field(() => Int)
  id: Number;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  username: string;

  @Prop()
  @Field()
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  @Field()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);