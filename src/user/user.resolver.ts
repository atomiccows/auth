import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(returns => [User])
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Query(returns => User)
  async findOneByEmail(@Args('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }

  @Mutation(returns => User)
  async create(
    @Args('email') email: string,
    @Args('password') password: string,
    ) {
      return await this.userService.create({email, password});
  }
}
