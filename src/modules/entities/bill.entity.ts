import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {
  IsUUID,
  IsOptional,
  Length,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Auditable, BillItem, Company } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bill')
export class Bill extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Unique identifier of bill',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column({ name: 'bill_no' })
  @Length(2, 255)
  @ApiProperty({
    description: 'Bill number of bill',
    nullable: true,
    type: String,
  })
  billNo?: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Total cost of bill',
    nullable: true,
    type: Number,
  })
  total?: number;

  @Column({ name: 'total_iva' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Total cost of IVA tax',
    nullable: true,
    type: Number,
  })
  totalIva?: number;

  @Column({ name: 'company_id' })
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier of company who ownes bill',
    nullable: false,
    type: String,
  })
  companyId?: string;

  @Column({ name: 'related_company_id' })
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier of company who is related to bill',
    nullable: false,
    type: String,
  })
  relatedCompanyId?: string;

  @Column({ name: 'other_expenses' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Cost of other expense for bill',
    nullable: true,
    type: Number,
  })
  otherExpenses?: number;

  @Column({ name: 'is_paid' })
  @IsBoolean()
  @ApiProperty({
    description: 'Bill has been paid',
    nullable: true,
    type: Boolean,
  })
  isPaid?: boolean;

  @Column({ name: 'is_quote' })
  @IsBoolean()
  @ApiProperty({
    description: 'Bill is a Quote',
    nullable: true,
    type: Boolean,
  })
  isQuote?: boolean;

  @Column({ name: 'is_sale_receipt' })
  @IsBoolean()
  @ApiProperty({
    description: 'Bill is a for sales',
    nullable: true,
    type: Boolean,
  })
  isSaleReceipt?: boolean;

  @OneToMany(
    () => BillItem,
    BillItem => BillItem.bill,
    { cascade: true },
  )
  @IsArray()
  @ApiProperty({ type: () => [BillItem], minItems: 1 })
  billItems: BillItem[];

  @ManyToOne(
    () => Company,
    Company => Company.id,
  )
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(
    () => Company,
    Company => Company.id,
  )
  @JoinColumn({ name: 'related_company_id' })
  relatedCompany: Company;
}
