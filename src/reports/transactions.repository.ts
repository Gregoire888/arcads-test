import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../db/entities/transaction.entity';
import { Repository } from 'typeorm';
import {
  CityPerformanceReport,
  HighestMarginTransactionsReport,
} from './types';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  findTransactionsWithHighestMargin(
    take: number,
  ): Promise<HighestMarginTransactionsReport> {
    return this.repository.find({
      order: { transactionMargin: 'DESC' },
      take,
    });
  }

  getAverageMarginBetweenDates(start: Date, end: Date): Promise<number> {
    return this.repository
      .createQueryBuilder('transactions')
      .select('AVG(transaction_margin) as averageMargin')
      .where('transaction_date >= :start', { start })
      .andWhere('transaction_date <= :end', { end })
      .getRawOne() as Promise<number>;
  }

  getTopCitiesByMargin(take: number): Promise<CityPerformanceReport> {
    return this.repository
      .createQueryBuilder('transactions')
      .select('city, AVG(transaction_margin) as averageMargin')
      .groupBy('city')
      .orderBy('averageMargin', 'DESC')
      .limit(take)
      .getRawMany() as Promise<{ city: string; averageMargin: number }[]>;
  }
}
