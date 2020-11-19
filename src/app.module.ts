import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GraphQLModule} from '@nestjs/graphql';

import { ConfigModule } from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {MailerModule} from './mailer/mailer.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        AuthModule,
        MailerModule,
        GraphQLModule.forRoot({
            debug: true,
            playground: true,
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
            context: ({req}) => ({request: req}),
        }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    ],
    providers: [],
})

export class AppModule {
}
