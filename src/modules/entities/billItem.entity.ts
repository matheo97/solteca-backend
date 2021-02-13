import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsUUID, IsOptional, Length, IsInt, IsNumber } from 'class-validator';
import { Auditable, Bill } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bill_item')
export class BillItem extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Unique identifier for item',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @IsInt()
  @ApiProperty({
    description: 'Number of elements for item',
    nullable: false,
    type: Number,
  })
  quantity: number;

  @Column({ name: 'product_name' })
  @Length(2, 255)
  @ApiProperty({
    description: 'Name of the product',
    nullable: false,
    type: String,
  })
  productName: string;

  @Column({ name: 'details' })
  @Length(0, 255)
  @IsOptional()
  @ApiProperty({
    description: 'Details for the item',
    nullable: true,
    type: String,
  })
  details?: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Total cost of item',
    nullable: true,
    type: Number,
  })
  total: number;

  @ManyToOne(
    () => Bill,
    Bill => Bill.billItems,
  )
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;
}
