import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyDAO } from './company.dao';
import { Company } from '../entities/company.entity';
import { BillModule } from '../bill/bill.module';
import { FileModule } from '../file/file.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ Company ]),
    BillModule,
    FileModule,
    UserModule,
  ],
  providers: [
    CompanyService,
    CompanyDAO,
  ],
  controllers: [
    CompanyController,
  ],
})

export class CompanyModule {}