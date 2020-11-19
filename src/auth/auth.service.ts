import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

import { User } from '../user/interfaces/user.interface';
import { UserType } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/user.roles';
import { ChangePasswordRo, ForgotPasswordRo, LoginUserRo, RegisterUserRo } from './ro';
import { MailerService } from '../mailer/mailer.service';
import {RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
    ) {
    }

    async validateUserByPassword(
        loginAttempt: { email: string, password: string },
    ): Promise<LoginUserRo> {
        // This will be used for the initial login
        let userToAttempt;
        const {email, password} = loginAttempt;
        if (email) {
            const response = await this.userService.findOneByEmail(email);
            userToAttempt = response;
        }
        // Check the supplied password against the hash stored for this email address
        let isMatch = false;

        try {
          isMatch = await userToAttempt.comparePassword(password);
        } catch (error) {
          return { error: 'Invalid credentials' };
        }

        if (isMatch) {
            // If there is a successful match, generate a JWT for the user
            const token = this.createJwt(userToAttempt!).token;
            return {
                user: {
                    id: userToAttempt.id,
                    email: userToAttempt.email,
                    role: userToAttempt.role,
                },
                token,
            };
        }
        return { error: 'Invalid credentials' };
    }

    async validateJwtPayload(
        payload,
    ): Promise<UserType> {
        // This will be used when the user has already logged in and has a JWT
        const {email} = payload;
        return await this.userService.findOneByEmail(email);
    }

    createJwt(user: User): { data; token: string } {
        const expiresIn = 3600;
        let expiration: Date | undefined;
        if (expiresIn) {
            expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + expiresIn);
        }
        const data = {
            email: user.email,
            expiration,
        };
        const jwt = this.jwtService.sign(data);
        return {
            data,
            token: `JWT ${jwt}`,
        };
    }

    async createRegistration(registerUserInput: RegisterUserDto): Promise<RegisterUserRo> {
        const {email, password} = registerUserInput;
        let user = await this.userModel.findOne({email});
        if (user) {
            throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
        }

        user = new this.userModel({
            email,
            password,
            role: UserRole.CONSUMER,
        });
        await user.save();

        const jwt = this.jwtService.sign({
            email,
            password,
        });
        return {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            token: `JWT ${jwt}`,
        };
    }

    async changePassword(
        {email, oldPassword, newPassword}: { email: string, oldPassword: string, newPassword: string },
    ): Promise<ChangePasswordRo> {
        let user;
        try {
            user = await this.userService.findOneByEmail(email);
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        try {
            const match = await user.comparePassword(oldPassword);
            if (match) {
                user.password = newPassword;
                try {
                    await user.save();
                    return { message: 'Password changed' };
                } catch (error) {
                    return { error };
                }
            } else {
                return { error: 'Invalid credentials' };
            }
        } catch (error) {
            return { error };
        }
    }

    async forgotPassword({email, host}: { email: string, host: string }): Promise<ForgotPasswordRo> {
        let user;
        try {
            user = await this.userService.findOneByEmail(email);
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        try {
            const buffer = crypto.randomBytes(48);
            const resetToken = buffer.toString('hex');
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            try {
                await user.save();

                const message = {
                    subject: 'Reset Password',
                    text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://'}${host}/reset-password/${resetToken}\n\n` +
                        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                };

                await this.mailerService.sendEmail(user.email, message.subject, message.text);

                return {message: 'Please check your email for the link to reset your password.'};
            } catch (error) {
                return { error };
            }
        } catch (error) {
            return { error };
        }

    }

    async resetPassword({token, password}: { token: string, password: string }): Promise<ForgotPasswordRo> {
        let user;
        try {
            user = await this.userModel.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            try {
                user.save();
                const message = {
                    subject: 'Password Changed',
                    text: 'You are receiving this email because you changed your password. \n\n' +
                        'If you did not request this change, please contact us immediately.',
                };
                await this.mailerService.sendEmail(user.email, message.subject, message.text);
                return {message: 'Password changed successfully. Please login with your new password.'};
            } catch (error) {
                return { error };
            }
        } catch (error) {
            throw new HttpException('Your token has expired. Please attempt to reset your password again.', HttpStatus.NOT_FOUND);
        }
    }
}
