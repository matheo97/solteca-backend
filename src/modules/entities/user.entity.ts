import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn  
} from 'typeorm';
import {
  IsUUID,
  IsOptional,
  IsDefined, 
  Length, 
  IsEmail, 
  IsHash
} from 'class-validator';
import { Auditable, Company } from './index';

@Entity('company_user')
export class User extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  name: string;

  @Column({ name: 'last_name' })
  @IsOptional()
  @Length(0, 255)
  lastName?: string;

  @Column({ name: 'role_app' })
  @IsOptional()
  @Length(0, 255)
  roleApp?: string;

  @Column()
  @IsOptional()
  @Length(0, 255)
  role?: string;

  @Column()
  @IsOptional()
  @IsEmail()
  @Length(0, 255)
  email?: string;

  @Column()
  @IsOptional()
  @IsHash('sha256')
  password?: string;

  @Column()
  @IsDefined()
  @Length(10, 15)
  phone: string;

  @Column({ name: 'picture_url' })
  @IsOptional()
  pictureUrl?: string;

  @ManyToOne(() => Company, Company => Company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
