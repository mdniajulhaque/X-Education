import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CreateAdminInput } from 'src/users/dto';
import { LoginAdminInput, LoginResponse } from './dto';
import { User } from 'src/users/entities';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async loginAdmin(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return await this.authService.loginAdmin(loginAdminInput);
  }


  @Mutation(() => User)
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ): Promise<User> {
    return await this.authService.createAdmin(createAdminInput);
  }


}
