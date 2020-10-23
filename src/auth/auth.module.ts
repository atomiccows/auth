import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';

import {UserModule} from '../user/user.module';
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {User} from '../user/user.model';
import {MailerModule} from '../mailer/mailer.module';
import {AuthController} from './auth.controller';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        UserModule,
        MailerModule,
        User,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        // LocalStrategy,
        JwtStrategy,
        AuthService,
        AuthResolver,
    ],
    exports: [
        PassportModule,
        AuthService,
    ],
})

export class AuthModule {
}
