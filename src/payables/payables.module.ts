// payables/payables.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importe o HttpModule do @nestjs/axios
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';

@Module({
  controllers: [PayablesController],
  providers: [PayablesService],
  imports: [HttpModule], // Adicione o HttpModule aos imports
  exports: [PayablesService]
})
export class PayablesModule {}
