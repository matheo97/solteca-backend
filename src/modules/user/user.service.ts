import {
  Injectable,
} from '@nestjs/common';
import { UserDAO } from './user.dao';

export type User = any;
@Injectable()
export class UserService {

  private readonly users: User[];
  constructor(private readonly userDao: UserDAO) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async createUser(): Promise<string> {
    return this.userDao.createUser();
  }
  
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
