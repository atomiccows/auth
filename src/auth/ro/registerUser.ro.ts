import { Field, ObjectType } from 'type-graphql';

import {AuthUserRo} from './user.ro';

@ObjectType()
export class RegisterUserRo {
  @Field()
  user: AuthUserRo;

  @Field()
  token: string;
}
