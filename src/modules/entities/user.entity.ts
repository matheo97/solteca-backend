import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsUUID,
  IsOptional,
  IsDefined,
  Length,
  IsEmail,
  IsHash,
} from 'class-validator';
import { Auditable, Company } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('company_user')
export class User extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for User',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Name for User',
    nullable: false,
    type: String,
  })
  name: string;

  @Column({ name: 'last_name' })
  @Length(2, 255)
  @ApiProperty({
    description: 'Last name for User',
    nullable: true,
    type: String,
  })
  lastName?: string;

  @Column({ name: 'role_app' })
  @IsOptional()
  @Length(0, 255)
  @ApiProperty({
    description: 'Role for User in the app',
    nullable: true,
    enum: ['solteca-admin', 'accountant', 'solteca-user'],
  })
  roleApp?: string;

  @Column()
  @IsOptional()
  @Length(0, 255)
  @ApiProperty({
    description: 'Role for User in the company',
    nullable: true,
    type: String,
  })
  role?: string;

  @Column()
  @IsOptional()
  @IsEmail()
  @Length(0, 255)
  @ApiProperty({
    description: 'Email for the user',
    nullable: true,
    type: String,
  })
  email?: string;

  @Column()
  @IsOptional()
  @IsHash('sha256')
  @ApiProperty({
    description: 'Password for the user',
    nullable: true,
    type: String,
  })
  password?: string;

  @Column()
  @IsDefined()
  @Length(10, 15)
  @ApiProperty({
    description: 'Phone number',
    nullable: false,
    type: String,
  })
  phone: string;

  @Column({ name: 'picture_url' })
  @IsOptional()
  @ApiProperty({
    description: 'Picture',
    nullable: false,
    type: String,
  })
  pictureUrl?: string;

  @ManyToOne(
    () => Company,
    Company => Company.id,
  )
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
