// app.module.ts
import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { PayablesModule } from './payables/payables.module';

@Module({
  imports: [TransactionsModule, PayablesModule],
})
export class AppModule {}
