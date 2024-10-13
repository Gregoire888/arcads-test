import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import {
  TransactionsService,
  CreateTransactionDto,
} from './transactions.service';
import { isFailure } from '../utils/operation-result';
import { z } from 'zod';
import { PropertyType } from '../types/transaction';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(@Body() transactionDto: CreateTransactionDto) {
    const validationErrors = this.validateTransactionDto(transactionDto);
    if (validationErrors.length) {
      throw new BadRequestException(validationErrors);
    }
    const result =
      await this.transactionsService.createTransaction(transactionDto);
    if (isFailure(result)) {
      throw new InternalServerErrorException(result.reason);
    }
    return result.data;
  }

  private validateTransactionDto(
    transactionDto: Record<string, unknown>,
  ): string[] {
    const transactionDtoSchema = z.object({
      transactionDate: z.string().datetime(),
      transactionNetValue: z.number(),
      transactionCost: z.number(),
      propertyType: z.nativeEnum(PropertyType),
      city: z.string(),
      area: z.number(),
    });
    return (
      transactionDtoSchema
        .safeParse(transactionDto)
        .error?.errors.map((err) => err.message) ?? []
    );
  }
}
