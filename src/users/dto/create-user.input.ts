import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class deleteUserInput {
 
  @Field()
  id: string;
}
