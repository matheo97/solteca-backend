import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  UserModule,
  BillModule,
  CompanyModule,
  FileModule,
} from './modules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BillModule,
    CompanyModule,
    FileModule,
    UserModule,
  ],
})
export class AppModule {}
