import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDAO } from './user.dao';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
  ],
  providers: [
    UserService,
    UserDAO,
  ],
  controllers: [
    UserController,
  ],
  exports: [
    UserService,
  ],
})

export class UserModule {}