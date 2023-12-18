import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoursesService } from '../services/courses.service';
import { Course } from '../entities/course.entity';
import { CreateAdminInput } from '../dto/create-admin.input';
import Role from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCourse } from '../entities';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}


  @Mutation(() => Course)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createCourse(
    @Args('createCourse') createCourse:CreateCourse
  ): Promise<Course> {
    return await this.coursesService.createCourse(createCourse);
  }


  

}
