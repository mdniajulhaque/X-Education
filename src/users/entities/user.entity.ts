import { ObjectType, Field} from '@nestjs/graphql';
import Role from 'src/auth/enums/roles.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
@ObjectType()
export class User {

  @Field(()=>String,{nullable:true})
  _id?: string;


  @Prop({type:String,required:true})
  @Field(()=>String)
  email: string;

  @Prop({type:String,required:true})
  password: string;

  @Prop({type:String})
  @Field(() => String,{nullable:true})
  username?: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  @Field(() => String)
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);