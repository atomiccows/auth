import {Body, Controller, Post, UseGuards, UsePipes} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation} from '@nestjs/swagger';

import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {User} from '../user/user.decorator';
import {ValidatorPipe} from '../shared/validator.pipe';
import {LoginUserRo, RegisterUserRo, ChangePasswordRo} from './ro';
import {LoginUserDto, RegisterUserDto} from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('/login')
    @ApiOperation({ title: 'logs user in' })
    @UsePipes(ValidatorPipe)
    async loginUser(
        @Body() loginUserInput: LoginUserDto,
    ): Promise<LoginUserRo> {
        const { email, password } = loginUserInput;
        return await this.authService.validateUserByPassword({email, password});
    }

    @Post('/register')
    @ApiOperation({ title: 'registers new user and respective company' })
    @UsePipes(ValidatorPipe)
    async registerUser(
        @Body() registerUserInput: RegisterUserDto,
    ): Promise<RegisterUserRo> {
        return await this.authService.createRegistration(registerUserInput);
    }

    @Post('/password')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async changePassword(
        @Body() changePasswordInput,
        @User('email') email: string,
    ): Promise<ChangePasswordRo> {
        const { oldPassword, newPassword } = changePasswordInput;
        return await this.authService.changePassword({email, oldPassword, newPassword});
    }
}
