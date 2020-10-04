import { Entity, Column, PrimaryGeneratedColumn, Double, ManyToOne, JoinColumn } from 'typeorm';
import { IsUUID, IsOptional, Length, IsNumber } from 'class-validator';
import { Auditable, Bill } from './index';

@Entity('bill_item')
export class BillItem extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;

  @Column()
  @IsNumber()
  quantity?: number;

  @Column({ name: 'product_name' })
  @Length(0, 255)
  @IsOptional()
  productName?: string;

  @Column({ name: 'details' })
  @Length(0, 255)
  @IsOptional()
  details?: string;

  @Column()
  total?: string;

  @ManyToOne(() => Bill, Bill => Bill.id)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;
}
