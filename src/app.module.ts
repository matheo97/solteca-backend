import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, UserModule, BillModule, CompanyModule } from './modules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BillModule,
    CompanyModule,
    UserModule,
  ],
})
export class AppModule {}
