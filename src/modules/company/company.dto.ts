import { ApiProperty } from '@nestjs/swagger';
import { BillByQuarter, IVABalance, SalesPerMonth } from '../bill/bill.dto';
import { Company, File } from '../entities';

export class CompanyInfo {
  @ApiProperty({ type: () => [SalesPerMonth] })
  salesPerMonth: SalesPerMonth[];

  @ApiProperty({ type: () => [File] })
  files: File[];

  @ApiProperty()
  moneyOwned: number;

  @ApiProperty()
  moneyOwnedToUs: number;

  @ApiProperty({ type: () => Company })
  companyDetails: Company;

  @ApiProperty({ type: () => IVABalance })
  balanceIVA: IVABalance;
}

export class Taxes {
  @ApiProperty({ type: () => IVABalance })
  balanceIVA: IVABalance;

  @ApiProperty({ type: () => BillByQuarter })
  bills: BillByQuarter;
}
