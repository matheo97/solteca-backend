import { Injectable } from '@nestjs/common';
import { FileDAO } from './file.dao';
import { File } from '../entities/file.entity';
@Injectable()
export class FileService {
  constructor(private readonly fileDao: FileDAO) {}

  async getAllFiles(companyId: string): Promise<File[]> {
    return this.fileDao.getAllFiles(companyId);
  }

  async createFile(companyId: string, file: File): Promise<File> {
    return this.fileDao.createFile({ company: { id: companyId }, ...file });
  }

  async deleteFile(fileId: string): Promise<string> {
    return this.fileDao.deleteFile(fileId);
  }
}
