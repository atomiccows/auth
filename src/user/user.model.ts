import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {ObjectType, Field, ID} from 'type-graphql';

import {UserRole, Roles} from './user.roles';

// Class with class validator
@ObjectType()
export class User {
    @Field(type => ID, { nullable: true }) id: string;
    @Field() email: string;
    @Field() password: string;
    @Field() role: Roles;

    comparePassword = comparePassword;
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

export const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [...Object.values(UserRole)],
            default: UserRole.CONSUMER,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    });

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
    },
});

UserSchema.pre<User>('save', function(next) {
    const user = this;
    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) {
        return next();
    }

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (genSaltError, salt) => {
        if (genSaltError) {
            return next(genSaltError);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = comparePassword;
