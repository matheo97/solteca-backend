import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { IsUUID, IsOptional, Length } from 'class-validator';
import { Auditable, Bill, File, User } from './index';

@Entity('company')
export class Company extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;

  @Column()
  @Length(2, 255)
  nit?: string;

  @Column()
  @IsOptional()
  @Length(2, 255)
  name?: string;

  @Column()
  @Length(0, 255)
  @IsOptional()
  address?: string;

  @Column({ name: 'self_withholding_url' })
  @Length(0, 255)
  selfWithHoldingUrl?: string;

  @Column({ name: 'money_available' })
  @Length(0, 255)
  @IsOptional()
  moneyAvailable?: string;

  @UpdateDateColumn({ name: 'money_available_updated_at' })
  moneyAvailableUpdatedAt?: Date;

  @OneToMany(() => User, (user) => user.company)
  users?: User[];

  @OneToMany(() => File, (file) => file.company)
  files?: File[];

  @OneToMany(() => Bill, (Bill) => Bill.id)
  bills?: Bill[];

  @OneToMany(() => Bill, (Bill) => Bill.id)
  billsRelatedToMe?: Bill[];
}
