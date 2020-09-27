
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

  async createUser(): Promise<string> {
    return 'dao';
  }
}
