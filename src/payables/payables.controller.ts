// payables/payables.controller.ts
import { Controller, Get, Post, Delete, Param, Body, Query, Patch, Head } from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller('payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Get()
  getAllPayables() {
    console.log('entrou na rota getAllPayables do payables.controller.ts');
    return this.payablesService.getAllPayables();
  }

  @Get('/total')
  patch(
    @Query('startdate') startDate: string,
    @Query('enddate') endDate: string,
  ){
    return this.payablesService.calculateTotalPayablesByMerchant(startDate, endDate);
  }

  @Get(':id')
  getPayableById(@Param('id') id: string) {
    return this.payablesService.getPayableById(id);
  }

  @Post()
  createPayable(@Body() payable: any) {
    return this.payablesService.createPayable(payable);
  }

  @Delete(':id')
  deletePayable(@Param('id') id: string) {
    return this.payablesService.deletePayable(id);
  }

}
 