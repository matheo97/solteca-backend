import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { BillDAO } from './bill.dao';
import { Bill } from '../entities/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  providers: [BillService, BillDAO],
  controllers: [BillController],
  exports: [BillService, BillDAO],
})
export class BillModule {}
