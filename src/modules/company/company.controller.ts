import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Company, User } from '../entities';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyInfo, Taxes } from './company.dto';

@Controller('/company')
@UseGuards(JwtAuthGuard)
@ApiTags('Company')
@ApiBearerAuth()
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @Get('/getInfo')
  @ApiOperation({ summary: 'Get all info of a Company' })
  @ApiOkResponse({ description: 'All company info', type: CompanyInfo })
  async getInfo(@Req() { user }: Request): Promise<CompanyInfo> {
    return this.companyService.getInfo((user as any).company.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Company' })
  @ApiOkResponse({ description: 'Company successfully created.', type: Company })
  async createCompany(@Body() company: Company): Promise<Company> {
    return this.companyService.createCompany(company);
  }

  @Put()
  @ApiOperation({ summary: 'Update Company' })
  @ApiOkResponse({ description: 'Company successfully updated.', type: Company })
  async updateCompany(@Body() company: Company): Promise<Company> {
    return this.companyService.updateCompany(company);
  }

  @Post('/:companyId/contact')
  @ApiOperation({ summary: 'Create Contact' })
  @ApiOkResponse({ description: 'Contact successfully created.', type: User })
  async createContact(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() contact: User,
  ): Promise<User> {
    return this.userService.createContact(companyId, contact);
  }

  @Put('/:companyId/contact')
  @ApiOperation({ summary: 'Create Contact' })
  @ApiOkResponse({ description: 'Contact successfully created.', type: User })
  async updateContact(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() contact: User,
  ) {
    return this.userService.updateContact(companyId, contact);
  }

  @Delete('/contact/:contactId')
  @ApiOperation({ summary: 'Delete Contact' })
  @ApiOkResponse({ description: 'Delete contact from company.', type: String })
  async deleteContact(
    @Param('contactId', ParseUUIDPipe) contactId: string,
  ): Promise<string> {
    return this.userService.deleteContact(contactId);
  }

  @Get('/taxes')
  @ApiOperation({ summary: 'Get the taxes of a company' })
  @ApiOkResponse({ description: 'Taxes of a company.', type: Taxes })
  async getTaxes(
    @Req() { user }: Request,
    @Query('isSale') isSale: boolean,
    @Query('quarter') quarter: string,
  ): Promise<Taxes> {
    return this.companyService.getTaxes((user as any).company.id, quarter, isSale);
  }
}
