import { Entity, PrimaryGeneratedColumn  } from 'typeorm';
import {
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Auditable } from './auditable.entity';

@Entity('company_user')
export class User extends Auditable {
  @PrimaryGeneratedColumn('uuid')
  @IsOptional()
  @IsUUID()
  id?: string;
}
