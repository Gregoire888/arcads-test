import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { isFailure } from '../utils/operation-result';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('highest-margin')
  async getHighestMarginTransactions() {
    const result = await this.reportsService.getHighestMarginTransactions();
    if (isFailure(result)) {
      throw new InternalServerErrorException(result.reason);
    }
    return result.data;
  }

  @Get('weekly-average-margin')
  async getWeeklyAverageMargin() {
    const result = await this.reportsService.getWeeklyAverageMargin();
    if (isFailure(result)) {
      throw new InternalServerErrorException(result.reason);
    }
    return result.data;
  }

  @Get('city-performance')
  async getCityPerformance() {
    const result = await this.reportsService.getCityPerformance();
    if (isFailure(result)) {
      throw new InternalServerErrorException(result.reason);
    }
    return result.data;
  }
}
