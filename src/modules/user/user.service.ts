import {
  Injectable,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDAO } from './user.dao';
@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDAO) 
  {}

  async getUserInfoById(userId: string): Promise<User> {
    return this.userDao.getUserInfoById(userId);
  }
  
  async getUserByEmail(email: string): Promise<User> {
    return this.userDao.getUserByEmail(email);
  }
}
