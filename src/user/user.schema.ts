import mongoose from 'mongoose';

import { UserRole } from './user.roles';

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
    },
);
