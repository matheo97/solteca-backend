import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { IsUUID, IsOptional, Length, IsEnum } from 'class-validator';
import { Auditable, Bill, File, User } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('company')
export class Company extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Unique identifier for Company',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @Length(2, 255)
  @ApiProperty({
    description: 'Number of Tributary Identification',
    nullable: true,
    type: String,
  })
  nit?: string;

  @Column()
  @Length(2, 255)
  @ApiProperty({
    description: 'Name for the company',
    nullable: true,
    type: String,
  })
  name?: string;

  @Column()
  @Length(0, 255)
  @IsOptional()
  @ApiProperty({
    description: 'Address for the company',
    nullable: true,
    type: String,
  })
  address?: string;

  @Column({ name: 'self_withholding_url' })
  @Length(0, 255)
  @ApiProperty({
    description: 'Identifier to differentiate if Company is SelfWithHolding',
    nullable: true,
    type: String,
  })
  selfWithHoldingUrl?: string;

  @Column({ name: 'money_available' })
  @Length(0, 255)
  @IsOptional()
  @ApiProperty({
    description: 'Money available in the bank account of the company',
    nullable: true,
    type: String,
  })
  moneyAvailable?: string;

  @Column()
  @IsEnum(['customer', 'supplier', 'both'])
  @ApiProperty({
    description: 'Type of company',
    nullable: false,
    enum: ['customer', 'supplier', 'both'],
  })
  type?: string;

  @UpdateDateColumn({ name: 'money_available_updated_at' })
  @ApiProperty({
    description: 'Last time money in the account was updated',
    nullable: false,
    type: String,
  })
  moneyAvailableUpdatedAt?: Date;

  @OneToMany(
    () => User,
    user => user.company,
  )
  users?: User[];

  @OneToMany(
    () => File,
    file => file.company,
  )
  files?: File[];

  @OneToMany(
    () => Bill,
    Bill => Bill.id,
  )
  bills?: Bill[];

  @OneToMany(
    () => Bill,
    Bill => Bill.id,
  )
  billsRelatedToMe?: Bill[];
}
