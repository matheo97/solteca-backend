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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PageResponse } from '../base/PageResponse';
import { Consecutive } from './bill.dto';

@Controller('/bill')
@UseGuards(JwtAuthGuard)
@ApiTags('Bills')
@ApiBearerAuth()
@ApiExtraModels(PageResponse)
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of all Bills' })
  @ApiOkResponse({
    description: 'List of all Bills',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PageResponse) },
        {
          properties: {
            results: {
              type: 'array',
              items: { $ref: getSchemaPath(Bill) },
            },
          },
        },
      ],
    },
  })
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
  ): Promise<PageResponse<Bill>> {
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
  @ApiOperation({ summary: 'Create a Bill' })
  @ApiCreatedResponse({ description: 'The Bill has been successfully created.', type: Bill })
  async createBill(@Body() bill: Bill): Promise<Bill> {
    return this.billService.createBill(bill);
  }

  @Put()
  @ApiOperation({ summary: 'Update a Bill' })
  @ApiOkResponse({ description: 'The Bill has been successfully updated.', type: Bill })
  async updateBill(@Body() bill: Bill): Promise<Bill> {
    return this.billService.updateBill(bill);
  }

  @Get('/consecutive')
  @ApiOperation({ summary: 'Get consecutive for Bill' })
  @ApiOkResponse({ description: 'Get consecutive for Bill.', type: Consecutive })
  async getConsecutiveForBill(
    @Req() { user }: Request,
  ): Promise<Consecutive> {
    return this.billService.getConsecutiveForBill((user as any).company.id);
  }
}
