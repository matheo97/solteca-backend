import { ApiProperty } from '@nestjs/swagger';
import { Bill } from '../entities';

export class Consecutive {
  @ApiProperty()
  consecutive: number;
}

export class SalesPerMonth {
  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  total: number;
}

export class IVABalance {
  @ApiProperty()
  iva: number;

  @ApiProperty({ enum: ['pay', 'be paid', 'No bills found'] })
  status: 'pay' | 'be paid' | 'No bills found';
}

export class BillByQuarter {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: () => [Bill] })
  results: Bill[];
}
