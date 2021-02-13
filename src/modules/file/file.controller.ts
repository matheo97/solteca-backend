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
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/file')
@UseGuards(JwtAuthGuard)
@ApiTags('Files')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/create-file')
  @ApiOperation({ summary: 'Create a File' })
  @ApiCreatedResponse({ description: 'The File has been successfully created.', type: File })
  async createFile(
    @Req() { user }: Request,
    @Body() file: File,
  ): Promise<File> {
    return this.fileService.createFile((user as any).company.id, file);
  }

  @Delete('/delete-file/:fileId')
  @ApiOperation({ summary: 'Delete a File' })
  @ApiOkResponse({ description: 'The File has been successfully deleted.', type: String })
  async getInfo(
    @Param('fileId', ParseUUIDPipe) fileId: string,
  ): Promise<string> {
    return this.fileService.deleteFile(fileId);
  }
}
