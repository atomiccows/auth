import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class JwtPayload {
  @Field()
  sub: string;

  @Field()
  iat: number;

  @Field()
  exp: number;
}
