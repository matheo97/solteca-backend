import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { getDatesByQuarter } from 'src/utils';
import { Bill } from '../entities';
import { BillDAO } from './bill.dao';

@Injectable()
export class BillService {
  constructor(private readonly billDao: BillDAO) {}

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

  async getAllBills(
    companyId: string,
    sale: boolean,
    quote: boolean,
    paid: boolean,
    month: number,
    quarter: string,
    searchText: string,
    page: number,
    pageSize: number,
  ): Promise<{ total: number; results: Bill[] }> {
    return this.billDao.getAllBills(
      companyId,
      sale,
      quote,
      paid,
      month,
      quarter,
      searchText,
      page,
      pageSize,
    );
  }

  async createBill(bill: Bill): Promise<Bill> {
    if (await this.billDao.billNoAlreadyExists(bill.billNo)) {
      throw new ConflictException({
        error: 'Consecutivo de factura ya usado.',
      });
    }
    return this.billDao.createBill(bill);
  }

  async updateBill(bill: Bill): Promise<Bill> {
    if (!bill.id) {
      throw new BadRequestException('Id de la factura es requerido');
    }
    bill.billItems.forEach((item, index) => {
      if (!item.id)
        throw new BadRequestException(`Id del elemento ${index} es nulo`);
    });
    if (await this.billDao.billNoAlreadyExists(bill.billNo, bill.id)) {
      throw new ConflictException({
        error: 'Consecutivo de factura ya usado.',
      });
    }
    return this.billDao.createBill(bill);
  }

  async getConsecutiveForBill(companyId: string): Promise<{consecutive: number}> {
    const bill = await this.billDao.getConsecutiveForBill(companyId);
    const currentConsecutiveUsed = parseInt(bill.billNo, 10);
    return {
      consecutive: currentConsecutiveUsed + 1,
    };
  }
}
