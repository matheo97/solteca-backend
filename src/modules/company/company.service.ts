import { ConflictException, Injectable } from '@nestjs/common';
import { getDatesByQuarterProvided } from 'src/utils';
import { BillService } from '../bill/bill.service';
import { Company } from '../entities';
import { FileService } from '../file/file.service';
import { CompanyDAO } from './company.dao';
import { Taxes } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyDao: CompanyDAO,
    private readonly billService: BillService,
    private readonly fileService: FileService,
  ) {}

  async getInfo(companyId: string) {
    const salesPerMonth = this.billService.getSalesPerMonth(
      companyId,
      new Date(),
    );
    const files = this.fileService.getAllFiles(companyId);
    const moneyOwned = this.billService.getTotalOfAllBillsNotPaid(
      companyId,
      false,
    );
    const moneyOwnedToUs = this.billService.getTotalOfAllBillsNotPaid(
      companyId,
      true,
    );
    const balanceIVA = this.billService.getIVABalance(companyId, new Date());
    const companyDetails = this.companyDao.getCompanyDetailById(companyId);

    const results = await Promise.all([
      salesPerMonth,
      files,
      moneyOwned,
      moneyOwnedToUs,
      companyDetails,
      balanceIVA,
    ]);

    return {
      salesPerMonth: results[0],
      files: results[1],
      moneyOwned: results[2],
      moneyOwnedToUs: results[3],
      companyDetails: results[4],
      balanceIVA: results[5],
    };
  }

  async getCompaniesByName(
    name: string,
  ): Promise<Company[]> {
    return this.companyDao.getCompaniesByName(name);
  }

  async createCompany(company: Company): Promise<Company> {
    const companiesWithSameNit = await this.companyDao.companiesWithTheSameNit(
      company.nit,
      company.id,
    );
    if (companiesWithSameNit) {
      throw new ConflictException(
        `Hay un empresa con el mismo nit llamada ${companiesWithSameNit.name}`,
      );
    }
    return this.companyDao.createCompany(company);
  }

  async updateCompany(company: Company): Promise<Company> {
    if (!company.id) {
      throw new ConflictException(`No se envio company id`);
    }
    return this.createCompany(company);
  }

  async getTaxes(
    companyId: string,
    quarter: string,
    isSale: boolean,
  ): Promise<Taxes> {
    const quarterInfo = getDatesByQuarterProvided(quarter);

    if (quarterInfo.error) {
      throw new ConflictException(`Cuatrimestre Invalido`);
    }

    const balanceIVA = this.billService.getIVABalanceWithDates(
      companyId,
      quarterInfo.from,
      quarterInfo.to,
    );

    const bills = this.billService.getBillsByQuarter(
      companyId,
      quarterInfo.from,
      quarterInfo.to,
      isSale,
    );

    const results = await Promise.all([balanceIVA, bills]);

    return {
      balanceIVA: results[0],
      bills: results[1],
    };
  }
}
