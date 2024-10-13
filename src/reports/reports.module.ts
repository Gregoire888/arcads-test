import { Module } from '@nestjs/common';
import { ReportsService, TransactionsRepositoryType } from './reports.service';
import { ReportsController } from './reports.controller';
import { TransactionsRepository } from './transactions.repository';
import { TransactionEntity } from '../db/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    ReportsService,

    { provide: TransactionsRepositoryType, useClass: TransactionsRepository },
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
