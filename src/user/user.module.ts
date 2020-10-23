import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    UserResolver,
    UserService,
    User,
  ],
  exports: [UserService, User],
})
export class UserModule {}
