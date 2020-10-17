import {
  Injectable,
} from '@nestjs/common';
import { getDatesByQuarter } from 'src/utils';
import { BillDAO } from './bill.dao';

@Injectable()
export class BillService {

  constructor(private readonly billDao: BillDAO) 
  {}

  async getSalesPerMonth(companyId: string, date: Date) {
    return this.billDao.getSalesPerMonth(companyId, date);
  }

  async getTotalOfAllBillsNotPaid(companyId: string, isSalesReceipt: boolean) {
    return this.billDao.getTotalOfAllBillsNotPaid(companyId, isSalesReceipt);
  }

  async getIVABalance(companyId: string, date: Date) {
    const { from, to } = getDatesByQuarter(date);
    return this.billDao.getIVABalance(companyId, from, to);
  }
}
