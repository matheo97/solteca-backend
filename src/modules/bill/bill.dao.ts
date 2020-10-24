import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from '../entities/bill.entity';
import { getDatesByQuarterProvided } from 'src/utils';

@Injectable()
export class BillDAO {
  constructor(
    @InjectRepository(Bill)
    private readonly repository: Repository<Bill>,
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
      const total = ivaSales[0]?.sum - ivaBuys[0]?.sum;
      return {
        iva: total,
        status: total >= 0 ? 'pay' : 'be paid',
      };
    } else if (ivaSales[0]?.sum) {
      return {
        iva: ivaSales[0].sum,
        status: 'pay',
      };
    } else if (ivaBuys[0]?.sum) {
      return {
        iva: ivaBuys[0]?.sum,
        status: 'be paid',
      };
    }

    return {
      iva: 0,
      status: 'No bills found',
    };
  }

  async prepareBillsQuery(
    companyId: string,
  ): Promise<SelectQueryBuilder<Bill>> {
    return this.repository
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.billItems', 'billItems')
      .leftJoinAndSelect('bill.company', 'company')
      .leftJoinAndSelect('bill.relatedCompany', 'relatedCompany')
      .where('bill.companyId = :companyId', { companyId });
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
    if (searchText) {
      return this.getAllBillBySearchCriteria(companyId, searchText);
    } else {
      return this.getAllBillByParamsCriteria(
        companyId,
        sale,
        quote,
        paid,
        month,
        quarter,
        page,
        pageSize,
      );
    }
  }

  async getAllBillByParamsCriteria(
    companyId: string,
    sale: boolean,
    quote: boolean,
    paid: boolean,
    month: number,
    quarter: string,
    page: number,
    pageSize: number,
  ): Promise<{ total: number; results: Bill[] }> {
    const query = await this.prepareBillsQuery(companyId);

    if (typeof sale === 'string') {
      const isSale = sale === 'true' ? true : false;
      query.andWhere('bill.isSaleReceipt = :isSale', { isSale });
    }

    if (typeof quote === 'string') {
      const isQuote = quote === 'true' ? true : false;
      query.andWhere('bill.isQuote = :isQuote', { isQuote });
    }

    if (typeof paid === 'string') {
      const isPaid = paid === 'true' ? true : false;
      query.andWhere('bill.isPaid = :isPaid', { isPaid });
    }

    if (typeof quarter === 'string') {
      const quarterResponse = getDatesByQuarterProvided(quarter);
      if (quarterResponse.error) {
        throw new HttpException(
          `Invalid quarter`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      query.andWhere('bill.created_at BETWEEN :from AND :to', {
        from: quarterResponse.from,
        to: quarterResponse.to,
      });
    }

    if (typeof month === 'string') {
      console.log('month', month);
      query.andWhere(
        `bill.created_at > CURRENT_DATE - INTERVAL '${month} months'`,
      );
    }

    const [result, total] = await query
      .skip(pageSize && page ? pageSize * (page - 1) : 0)
      .take(pageSize || 0)
      .getManyAndCount();

    return {
      total,
      results: result,
    };
  }

  async getAllBillBySearchCriteria(
    companyId: string,
    searchText: string,
  ): Promise<{ total: number; results: Bill[] }> {
    const query = await this.prepareBillsQuery(companyId);

    query.andWhere(
      new Brackets(qb => {
        qb.where('relatedCompany.name ILIKE :criteria', {
          criteria: `%${searchText}%`,
        }).orWhere('bill.billNo ILIKE :criteria', {
          criteria: `%${searchText}%`,
        });
      }),
    );

    const [result, total] = await query.getManyAndCount();

    return {
      total,
      results: result,
    };
  }

  async createBill(bill: Bill): Promise<Bill> {
    return this.repository.save(bill);
  }

  async getConsecutiveForBill(companyId: string): Promise<Bill> {
    return this.repository
      .createQueryBuilder('bill')
      .where('bill.companyId = :companyId', { companyId })
      .orderBy('bill.created_at', 'DESC')
      .getOne();
  }

  async getBillsByQuarter(
    companyId: string,
    from: string,
    to: string,
    isSaleReceipt: boolean,
  ): Promise<{ total: number; results: Bill[] }> {
    const [result, total] = await this.repository
    .createQueryBuilder('bill')
    .where('bill.companyId = :companyId', { companyId })
    .andWhere('bill.isSaleReceipt = :isSaleReceipt', { isSaleReceipt })
    .andWhere('bill.created_at >= :from', { from })
    .andWhere('bill.created_at <= :to', { to })
    .getManyAndCount();

    return {
      total,
      results: result,
    };
  }

  async billNoAlreadyExists(billNo: string, billId?: string): Promise<boolean> {
    const bill = this.repository
      .createQueryBuilder('bill')
      .where('bill.billNo = :billNo', { billNo });

    if (billId) {
      bill.andWhere('bill.id != :billId', { billId });
    }

    const result = await bill.getOne();
    console.log('result', result);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
