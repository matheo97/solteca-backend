import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDAO } from './user.dao';
@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDAO) {}

  async getUserInfoById(userId: string): Promise<User> {
    return this.userDao.getUserInfoById(userId);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userDao.getUserByEmail(email);
  }

  async createContact(companyId: string, user: User): Promise<User> {
    return this.userDao.createContact(companyId, user);
  }

  async updateContact(companyId: string, user: User): Promise<User> {
    if (!user.id) {
      throw new ConflictException(`No se envio el user id`);
    }
    return this.userDao.createContact(companyId, user);
  }

  async deleteContact(contactId: string): Promise<string> {
    return this.userDao.deleteContact(contactId);
  }
}
