import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ChangePasswordRo {

    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true})
    error?: string;
}
