import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InitModule } from 'src/init/init.module';
import { User, UserSchema } from './model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    InitModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
