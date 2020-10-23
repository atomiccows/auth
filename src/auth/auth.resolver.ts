import {Query, Resolver, Mutation, Args, Context} from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {Request} from 'express';

import {AuthService} from './auth.service';
import {User as UserModel} from '../user/user.model';
import {UserService} from '../user/user.service';
import {LoginUserRo, RegisterUserRo, ChangePasswordRo, ForgotPasswordRo} from './ro';
import {AuthGuard} from './auth.guard';
import {RegisterUserDto} from './dto';
import {UserCTX} from '../user/user.decorator';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
    }

    @Mutation(returns => LoginUserRo)
    async loginUser(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<LoginUserRo> {
        return await this.authService.validateUserByPassword({email, password});
    }

    @Mutation(returns => RegisterUserRo)
    async registerUser(
        @Args('registerUserInput') registerUserInput: RegisterUserDto,
    ): Promise<RegisterUserRo> {
        return await this.authService.createRegistration(registerUserInput);
    }

    @Query(returns => UserModel)
    @UseGuards(AuthGuard)
    findMe(
        @UserCTX('email') email: string,
    ): Promise<UserModel> {
        return this.userService.findOneByEmail(email);
    }

    @Mutation(returns => ChangePasswordRo)
    @UseGuards(AuthGuard)
    async changePassword(
        @Args('oldPassword') oldPassword: string,
        @Args('newPassword') newPassword: string,
        @UserCTX('email') email: string,
    ): Promise<ChangePasswordRo> {
        return await this.authService.changePassword({email, oldPassword, newPassword});
    }

    @Mutation(returns => ForgotPasswordRo)
    async forgotPassword(
        @Args('email') email: string,
        @Context('request') request: Request,
    ): Promise<ForgotPasswordRo> {
        return await this.authService.forgotPassword({email, host: request.headers.host});
    }

    @Mutation(returns => ForgotPasswordRo)
    async resetPassword(
        @Args('password') password: string,
        @Args('token') token: string,
    ): Promise<ForgotPasswordRo> {
        return await this.authService.resetPassword({token, password });
    }
}
