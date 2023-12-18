import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import Role from 'src/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly usersService: CoursesService) {}

  // Example of a query that requires a JWT token and a role of ADMIN
  @Query(() => [Course], { name: 'foradmin' })
  // Make sure to add RolesGuard to the @UseGuards() decorator
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Create roles in enums/roles.enum.ts
  // Import the enum
  // Add the right roles to the @Roles() decorator
  @Roles(Role.ADMIN)
  findAllforAdmin(): Promise<Course[]> {
    return this.usersService.findAll();
  }


  @Query(() => [Course], { name: 'forbrand' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BRAND)
  findAllforBrand(): Promise<Course[]> {
    return this.usersService.findAll();
  }


  @Query(() => [Course], { name: 'users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  findAllforUser(): Promise<Course[]> {
    return this.usersService.findAll();
  }

  @Query(() => Course, { name: 'user' })
  findOne(@Args('email') email: string): Promise<Course> {
    return this.usersService.findOneUser(email);
  }

// @Mutation(() => User)
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
// async deleteOnlyforAdmin(@Args('deleteUserInput') deleteUserInput: deleteUserInput) 
//   {
//   return await this.usersService.delete(deleteUserInput.id);
// }

}
