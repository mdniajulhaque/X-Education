import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {

  @Field(()=>String)
  email: string;

  @Field(()=>String)
  password: string;
}

