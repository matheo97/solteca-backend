import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { IsUUID, IsOptional, Length, IsBoolean } from 'class-validator';
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
  total?: string;

  @Column({ name: 'total_iva' })
  totalIva?: string;

  @Column({ name: 'other_expenses' })
  otherExpenses?: string;

  @Column({ name: 'is_paid' })
  @IsBoolean()
  isPaid?: boolean;

  @Column({ name: 'is_quote' })
  @IsBoolean()
  isQuote?: boolean;

  @Column({ name: 'is_sells_receipt' })
  @IsBoolean()
  isSellsReceipt?: boolean;

  @OneToMany(() => BillItem, (BillItem) => BillItem.bill)
  billItems?: BillItem[];

  @ManyToOne(() => Company, Company => Company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Company, Company => Company.id)
  @JoinColumn({ name: 'related_company_id' })
  relatedCompany: Company;
}
