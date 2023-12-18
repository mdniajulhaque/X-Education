import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, deleteUserInput } from './dto/create-user.input';
import Role from 'src/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Example of a query that requires a JWT token and a role of ADMIN
  @Query(() => [User], { name: 'foradmin' })
  // Make sure to add RolesGuard to the @UseGuards() decorator
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Create roles in enums/roles.enum.ts
  // Import the enum
  // Add the right roles to the @Roles() decorator
  @Roles(Role.ADMIN)
  findAllforAdmin(): Promise<User[]> {
    return this.usersService.findAll();
  }


  @Query(() => [User], { name: 'forbrand' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BRAND)
  findAllforBrand(): Promise<User[]> {
    return this.usersService.findAll();
  }


  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  findAllforUser(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('email') email: string): Promise<User> {
    return this.usersService.findOne(email);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN,Role.BRAND)
  createforAdminandBrand(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

@Mutation(() => User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
async deleteOnlyforAdmin(@Args('deleteUserInput') deleteUserInput: deleteUserInput) 
  {
  return await this.usersService.delete(deleteUserInput.id);
}

}
