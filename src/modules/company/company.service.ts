import {
  Injectable,
} from '@nestjs/common';
import { BillService } from '../bill/bill.service';
import { FileService } from '../file/file.service';
import { CompanyDAO } from './company.dao';


@Injectable()
export class CompanyService {

  constructor(
    private readonly companyDao: CompanyDAO,
    private readonly billService: BillService,
    private readonly fileService: FileService,
  ) 
  {}

  async getInfo(companyId: string) {
    const salesPerMonth = this.billService.getSalesPerMonth(companyId, new Date());
    const files = this.fileService.getAllFiles(companyId);
    const moneyOwned = this.billService.getTotalOfAllBillsNotPaid(companyId, false);
    const moneyOwnedToUs = this.billService.getTotalOfAllBillsNotPaid(companyId, true);
    const balanceIVA = this.billService.getIVABalance(companyId, new Date());
    const companyDetails = this.companyDao.getCompanyDetailById(companyId);

    const results = await Promise.all([ 
      salesPerMonth, 
      files, 
      moneyOwned, 
      moneyOwnedToUs,
      companyDetails,
      balanceIVA
    ]);
    
    return {
      salesPerMonth: results[0],
      files: results[1],
      moneyOwned: results[2],
      moneyOwnedToUs: results[3],
      companyDetails: results[4],
      balanceIVA: results[5]
    }
  }
}
