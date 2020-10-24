import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Company, User } from '../entities';

@Controller('/company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @Get('/getInfo')
  async getInfo(@Req() { user }: Request) {
    return this.companyService.getInfo((user as any).company.id);
  }

  @Post()
  async createCompany(@Body() company: Company) {
    return this.companyService.createCompany(company);
  }

  @Put()
  async updateCompany(@Body() company: Company) {
    return this.companyService.updateCompany(company);
  }

  @Post('/:companyId/contact')
  async createContact(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() contact: User,
  ) {
    return this.userService.createContact(companyId, contact);
  }

  @Put('/:companyId/contact')
  async updateContact(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() contact: User,
  ) {
    return this.userService.updateContact(companyId, contact);
  }

  @Delete('/contact/:contactId')
  async deleteContact(
    @Param('contactId', ParseUUIDPipe) contactId: string,
  ) {
    return this.userService.deleteContact(contactId);
  }
}
