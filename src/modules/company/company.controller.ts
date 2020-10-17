import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('/getInfo')
  async getInfo(
    @Req() { user }: Request
  ) {
    return this.companyService.getInfo((user as any).company.id);
  }
}