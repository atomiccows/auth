import { Query, Resolver, Args, Mutation, Root } from '@nestjs/graphql';
import { FieldResolver } from 'type-graphql';

import { UserType } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => [UserType])
  async findAllUsers(): Promise<UserType[]> {
    return await this.userService.findAllUsers();
  }

  @Query(() => UserType)
  async findOneByEmail(@Args('email') email: string): Promise<UserType> {
    return await this.userService.findOneByEmail(email);
  }

  @Mutation(() => UserType)
  async create(
    @Args('email') email: string,
    @Args('password') password: string,
    ) {
      return await this.userService.create({email, password});
  }

  @FieldResolver(() => UserType)
  async comparePassword(@Root() user: UserType, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      return error;
    }
  }
}
