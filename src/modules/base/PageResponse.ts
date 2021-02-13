
import { ApiProperty } from '@nestjs/swagger';

export class PageResponse<T> {
  @ApiProperty()
  total: number;

  results: T[];
}