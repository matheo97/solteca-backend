import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileService } from './file.service';
import { Request } from 'express';
import { File } from '../entities/file.entity';

@Controller('/file')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/create-file')
  async createFile(
    @Req() { user }: Request,
    @Body() file: File,
  ): Promise<File> {
    return this.fileService.createFile((user as any).company.id, file);
  }

  @Delete('/delete-file/:fileId')
  async getInfo(
    @Param('fileId', ParseUUIDPipe) fileId: string,
  ): Promise<string> {
    return this.fileService.deleteFile(fileId);
  }
}
