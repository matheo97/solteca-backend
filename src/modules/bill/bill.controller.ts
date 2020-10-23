import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Bill } from '../entities';
import { BillService } from './bill.service';
import { Request } from 'express';

@Controller('/bill')
@UseGuards(JwtAuthGuard)
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  async getAllBills(
    @Req() { user }: Request,
    @Query('sale') sale: boolean,
    @Query('quote') quote: boolean,
    @Query('paid') paid: boolean,
    @Query('month') month: number,
    @Query('quarter') quarter: string,
    @Query('searchText') searchText: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ total: number; results: Bill[] }> {
    return this.billService.getAllBills(
      (user as any).company.id,
      sale,
      quote,
      paid,
      month,
      quarter,
      searchText,
      page,
      pageSize,
    );
  }

  @Post()
  async createBill(@Body() bill: Bill): Promise<Bill> {
    return this.billService.createBill(bill);
  }

  @Put()
  async updateBill(@Body() bill: Bill): Promise<Bill> {
    return this.billService.updateBill(bill);
  }
}
