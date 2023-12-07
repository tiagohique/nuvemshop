// transactions/transactions.controller.ts
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  getAllTransactions() {
    return this.transactionsService.getAllTransactions();
  }

  @Get(':id')
  getTransactionById(@Param('id') id: string) {
    return this.transactionsService.getTransactionById(id);
  }

  @Post()
  createTransaction(@Body() transaction: any) {
    return this.transactionsService.createTransaction(transaction);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: string) {
   //console.log('chegou o parametro no delete ' + id)
    return this.transactionsService.deleteTransaction(id);
  }

}
