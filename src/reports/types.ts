import { Transaction } from '../types/transaction';

export type HighestMarginTransactionsReport = Transaction[];

export type WeeklyAverageMarginReport = {
  currentWeekAvgMargin: number;
  previousWeekAvgMargin: number;
  averageMarginEvolutionInPercentage: number;
};

export type CityPerformanceReport = {
  city: string;
  averageMargin: number;
}[];
