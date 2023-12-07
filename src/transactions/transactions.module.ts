import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PayablesModule } from 'src/payables/payables.module';
import { PayablesService } from 'src/payables/payables.service';

@Module({
  imports: [PayablesModule,HttpModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
