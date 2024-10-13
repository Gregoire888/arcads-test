import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TransactionsRepositoryType,
  TransactionsService,
} from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionEntity } from '../db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    TransactionsService,
    { provide: TransactionsRepositoryType, useClass: TransactionsRepository },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
