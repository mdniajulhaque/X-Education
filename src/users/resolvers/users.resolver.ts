import { Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UsersService } from '../services';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

}
