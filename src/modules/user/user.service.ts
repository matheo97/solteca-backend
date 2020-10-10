import {
  Injectable,
} from '@nestjs/common';
import { UserDAO } from './user.dao';

export type User = any;
@Injectable()
export class UserService {

  private readonly users: User[];
  constructor(private readonly userDao: UserDAO) 
  {}

  async createUser(): Promise<string> {
    return this.userDao.createUser();
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userDao.getUserByEmail(email);
  }
}
