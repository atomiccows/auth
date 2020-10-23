import { Field, ObjectType } from 'type-graphql';

import {AuthUserRo} from './user.ro';

@ObjectType()
export class LoginUserRo {
  @Field({ nullable: true })
  user?: AuthUserRo;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true})
  error?: string;
}
