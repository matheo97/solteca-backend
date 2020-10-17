
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileDAO {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>
  ) {}

  async getAllFiles(companyId: string): Promise <File[]> {
    return this.repository.createQueryBuilder('file')
      .where('file.company.id = :companyId', { companyId })
      .getMany();
  }
}
