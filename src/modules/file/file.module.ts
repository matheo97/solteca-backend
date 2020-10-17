import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileDAO } from './file.dao';
import { File } from '../entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ File ]),
  ],
  providers: [
    FileService,
    FileDAO,
  ],
  controllers: [
    FileController,
  ],
  exports: [
    FileService,
  ]
})

export class FileModule {}