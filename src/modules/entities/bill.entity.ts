import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsUUID, IsOptional, Length, IsBoolean, IsNumber, IsArray } from 'class-validator';
import { Auditable, BillItem, Company } from './index';

@Entity('bill')
export class Bill extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;   

  @Column({ name: 'bill_no' })
  @Length(2, 255)
  billNo?: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  total?: number;

  @Column({ name: 'total_iva' })
  @IsNumber({ maxDecimalPlaces: 2 })
  totalIva?: number;

  @Column({ name: 'company_id' })
  @IsUUID()
  companyId?: string;

  @Column({ name: 'related_company_id' })
  @IsUUID()
  relatedCompanyId?: string;

  @Column({ name: 'other_expenses' })
  @IsNumber({ maxDecimalPlaces: 2 })
  otherExpenses?: number;

  @Column({ name: 'is_paid' })
  @IsBoolean()
  isPaid?: boolean;

  @Column({ name: 'is_quote' })
  @IsBoolean()
  isQuote?: boolean;

  @Column({ name: 'is_sale_receipt' })
  @IsBoolean()
  isSaleReceipt?: boolean;

  @OneToMany(
    () => BillItem,
    BillItem => BillItem.bill,
    { cascade: true }
  )
  @IsArray()
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
