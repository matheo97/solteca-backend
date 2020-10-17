import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IsUUID, IsOptional, Length } from 'class-validator';
import { Auditable, Company } from './index';

@Entity('file')
export class File extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @IsOptional()
  id?: string;

  @Column()
  @IsOptional()
  @Length(2, 255)
  name?: string;

  @Column({ name: 'file_url' })
  @Length(0, 255)
  fileUrl?: string;

  @ManyToOne(() => Company, Company => Company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
