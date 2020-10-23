import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthUserRo {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    role: string;
}
