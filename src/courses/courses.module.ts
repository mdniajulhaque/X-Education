import { Module } from '@nestjs/common';
import { Course, CourseSchema } from './entities/course.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesResolver } from './resolvers';
import { CoursesService } from './services';
@Module({
  imports: [
  MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  providers: [CoursesResolver, CoursesService],
})
export class CoursesModule {}
