import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Auditable {
  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({
    description: 'Date entity was created',
  })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({
    description: 'Date entity was updated',
  })
  updatedAt?: Date;
}
