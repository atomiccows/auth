import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    UserResolver,
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule {}
