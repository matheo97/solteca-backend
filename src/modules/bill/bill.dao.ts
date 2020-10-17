
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';

@Injectable()
export class BillDAO {
  constructor(
    @InjectRepository(Bill)
    private readonly repository: Repository<Bill>
  ) {}

  async getSalesPerMonth(companyId: string, date: Date) {
    return this.repository.query(`
      SELECT to_char(b.created_at,'Mon') as month,
             extract(year from b.created_at) as year,
             sum("total") as total
        FROM bill as b
        WHERE company_id = '${companyId}'
        AND extract(year from b.created_at) = '${date.getFullYear()}'
        AND b.is_quote = false
        AND b.is_sale_receipt = true
        GROUP BY 1,2
    `);
  }

  async getTotalOfAllBillsNotPaid(companyId: string, isSalesReceipt: boolean) {
    return this.repository.query(`
      SELECT sum("total") as total
        FROM bill as b
        WHERE company_id = '${companyId}'
        AND b.is_quote = false
        AND b.is_sale_receipt = ${isSalesReceipt}
        AND b.is_paid = false
    `);
  }

  async getIVABalance(companyId: string, from: string, to: string) {
    const ivaSales = await this.repository.query(`
      SELECT sum("total_iva")
      FROM bill as b
      WHERE company_id = '${companyId}'
      AND b.is_quote = false
      AND b.is_sale_receipt = true
      AND b.created_at BETWEEN '${from}' AND '${to}'
    `);
  
    const ivaBuys = await this.repository.query(`
      SELECT sum("total_iva")
      FROM bill as b
      WHERE company_id = '${companyId}'
      AND b.is_quote = false
      AND b.is_sale_receipt = false
      AND b.created_at BETWEEN '${from}' AND '${to}'
    `);

    if (ivaSales[0]?.sum && ivaBuys[0]?.sum) {
      const total = ivaSales[0]?.sum - ivaBuys[0]?.sum ;
      return {
        iva: total,
        status: total >= 0 ? 'pay' : 'be paid'
      }
    } else if (ivaSales[0]?.sum) {
      return {
        iva: ivaSales[0].sum,
        status: 'pay'
      }
    } else if (ivaBuys[0]?.sum) {
      return {
        iva: ivaBuys[0]?.sum,
        status: 'be paid'
      }
    }

    return {
      iva: 0,
      status: 'No bills found'
    }
  }
}
