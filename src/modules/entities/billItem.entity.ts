import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsUUID, IsOptional, Length, IsInt, IsNumber } from 'class-validator';
import { Auditable, Bill } from './index';

@Entity('bill_item')
export class BillItem extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;

  @Column()
  @IsInt()
  quantity: number;

  @Column({ name: 'product_name' })
  @Length(2, 255)
  productName: string;

  @Column({ name: 'details' })
  @Length(0, 255)
  @IsOptional()
  details?: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  total: number;

  @ManyToOne(() => Bill, Bill => Bill.billItems)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;
}
