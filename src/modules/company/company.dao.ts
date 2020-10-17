
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyDAO {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>
  ) {}

  async getCompanyDetailById(companyId: string): Promise<Company> {
    return this.repository
      .createQueryBuilder('company')
      .where('company.id = :companyId', { companyId })
      .getOne();
  }
}
