import { Injectable } from '@nestjs/common';
import { subDays } from 'date-fns';
import { OperationResult, succeed, fail } from '../utils/operation-result';

import {
  CityPerformanceReport,
  HighestMarginTransactionsReport,
  WeeklyAverageMarginReport,
} from './types';

export enum ReportsError {
  Unknown = 'Unknown error',
}

export abstract class TransactionsRepositoryType {
  abstract findTransactionsWithHighestMargin(
    take: number,
  ): Promise<HighestMarginTransactionsReport>;
  abstract getAverageMarginBetweenDates(
    start: Date,
    end: Date,
  ): Promise<number>;
  abstract getTopCitiesByMargin(take: number): Promise<CityPerformanceReport>;
}

@Injectable()
export class ReportsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepositoryType,
  ) {}

  async getHighestMarginTransactions(): Promise<
    OperationResult<HighestMarginTransactionsReport, ReportsError>
  > {
    try {
      const result =
        await this.transactionsRepository.findTransactionsWithHighestMargin(5);
      return succeed(result);
    } catch (error) {
      console.error(error);
      return fail(ReportsError.Unknown);
    }
  }

  async getWeeklyAverageMargin(): Promise<
    OperationResult<WeeklyAverageMarginReport, ReportsError>
  > {
    try {
      const today = new Date();
      const sevenDaysAgo = subDays(today, 7);
      const eightDaysAgo = subDays(today, 8);
      const fifteenDaysAgo = subDays(today, 15);

      const currentWeekMargin =
        await this.transactionsRepository.getAverageMarginBetweenDates(
          sevenDaysAgo,
          today,
        );
      const previousWeekMargin =
        await this.transactionsRepository.getAverageMarginBetweenDates(
          fifteenDaysAgo,
          eightDaysAgo,
        );

      return succeed({
        currentWeekAvgMargin: currentWeekMargin,
        previousWeekAvgMargin: previousWeekMargin,
        averageMarginEvolutionInPercentage:
          ((currentWeekMargin - previousWeekMargin) / previousWeekMargin) * 100,
      });
    } catch (error) {
      console.error(error);
      return fail(ReportsError.Unknown);
    }
  }

  async getCityPerformance(): Promise<
    OperationResult<CityPerformanceReport, ReportsError>
  > {
    try {
      const result = await this.transactionsRepository.getTopCitiesByMargin(5);
      return succeed(result);
    } catch (error) {
      console.error(error);
      return fail(ReportsError.Unknown);
    }
  }
}
