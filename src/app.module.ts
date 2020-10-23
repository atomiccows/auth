import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GraphQLModule} from '@nestjs/graphql';

import {Config} from './config/config';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {MailerModule} from './mailer/mailer.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        MailerModule,
        GraphQLModule.forRoot({
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
            context: ({req}) => ({request: req}),
        }),
        MongooseModule.forRoot(Config.db),
    ],
    providers: [],
})

export class AppModule {
}
