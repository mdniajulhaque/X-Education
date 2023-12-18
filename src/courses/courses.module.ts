import { Module } from '@nestjs/common';
import { CoursesService } from './services/courses.service';
import { CoursesResolver } from './resolvers/courses.resolver';
import { Course, CourseSchema } from './entities/course.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
  MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  providers: [CoursesResolver, CoursesService],
})
export class CoursesModule {}
