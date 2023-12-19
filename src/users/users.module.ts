import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities';
import { UsersResolver } from './resolvers';
import { UsersService } from './services';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
