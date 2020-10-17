import {
  Injectable,
} from '@nestjs/common';
import { FileDAO } from './file.dao';

@Injectable()
export class FileService {

  constructor(private readonly fileDao: FileDAO) 
  {}

  async getAllFiles(companyId: string) {
    return this.fileDao.getAllFiles(companyId);
  }
}
