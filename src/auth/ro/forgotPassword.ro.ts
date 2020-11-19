import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ForgotPasswordRo {
    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true})
    error?: string;
}
