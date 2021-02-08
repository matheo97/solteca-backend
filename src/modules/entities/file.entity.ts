import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IsUUID, IsOptional, Length, IsDefined, IsUrl } from 'class-validator';
import { Auditable, Company } from './index';
import { ApiProperty } from '@nestjs/swagger';

@Entity('file')
export class File extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'Unique identifier for File',
    nullable: true,
    type: String,
  })
  id?: string;

  @Column()
  @IsDefined()
  @Length(2, 255)
  @ApiProperty({
    description: 'Name for the File',
    nullable: false,
    type: String,
  })
  name: string;

  @Column({ name: 'file_url' })
  @IsUrl()
  @Length(0, 255)
  @ApiProperty({
    description: 'Url for the File',
    nullable: false,
    type: String,
  })
  fileUrl: string;

  @ManyToOne(
    () => Company,
    Company => Company.id,
  )
  @JoinColumn({ name: 'company_id' })
  company?: Company;
}
