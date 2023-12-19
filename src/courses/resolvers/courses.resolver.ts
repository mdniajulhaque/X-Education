import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoursesService } from '../services/courses.service';
import { Course } from '../entities/course.entity';
import Role from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCourse } from '../entities';
import { CurrentUser } from 'src/auth/decorators';
import { AllCoursesList, CreateCourseResponse, PaginationInput, UpdateCourseInput } from '../dto';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => CreateCourseResponse)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createCourse(
    @Args('createCourse') createCourse: CreateCourse,
    @CurrentUser('userData') userData: any,
  ): Promise<CreateCourseResponse> {
    return await this.coursesService.createCourse(
      createCourse,
      userData.userId,
    );
  }

  @Query(() => AllCoursesList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async allCourseList(
    @Args('paginationInput') paginationInput: PaginationInput,
  ): Promise<AllCoursesList> {

    return await this.coursesService.allCourseList(paginationInput);
  }

  @Query(() => Course)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getCourseById(@Args('courseId') courseId: string): Promise<Course> {

    return await this.coursesService.getCourseById(courseId);
  }

  @Mutation(() => Course)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateCourse(
    @Args('updateCourseInput') updateCourseInput: UpdateCourseInput,
    @CurrentUser('userData') userData: any,
    ): Promise<Course> {

    return await this.coursesService.updateCourse(updateCourseInput,userData.userId,);
  }

  @Mutation(() => Course)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteCourse(@Args('courseId') courseId: string): Promise<Course> {

  return await this.coursesService.deleteCourse(courseId);
  }
}
