import * as bcrypt from 'bcryptjs';
import { ObjectType, Field, ID } from 'type-graphql';
import { Roles } from '../user.roles';

@ObjectType()
export class UserType {
    @Field(() => ID, { nullable: true })
    readonly id?: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    role: Roles;

    // comparePassword = comparePassword;
}
// instance methods (shared between class and schema)
async function comparePassword(password: string): Promise<boolean> {
    const user = this;
    try {
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        return error;
    }
}
