
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserDAO {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async getUserInfoById(userId: string): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
