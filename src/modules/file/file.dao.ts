import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileDAO {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
  ) {}

  async getAllFiles(companyId: string): Promise<File[]> {
    return this.repository
      .createQueryBuilder('file')
      .where('file.company.id = :companyId', { companyId })
      .getMany();
  }

  async createFile(file: File): Promise<File> {
    return this.repository.save(file);
  }

  async deleteFile(fileId: string): Promise<string> {
    await this.repository.delete({ id: fileId }).catch(() => {
      throw new HttpException(
        `File was not deleted`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    return 'File deleted successfully';
  }
}
