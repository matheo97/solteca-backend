
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

  async companiesWithTheSameNit(nit: string, id?: string): Promise<Company> {
    const query = this.repository
      .createQueryBuilder('company')
      .where('company.nit = :nit', { nit })

    if (id) {
      query.andWhere('company.id != :id', { id });
    }

    return await query.getOne();
  }


  async createCompany(company: Company): Promise<Company> {
    return this.repository.save(company);
  }
}
