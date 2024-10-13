import { Injectable } from '@nestjs/common';
import { Transaction } from '../types/transaction';
import { OperationResult, succeed, fail } from '../utils/operation-result';
import { v4 as uuidv4 } from 'uuid';

export type CreateTransactionDto = Omit<
  Transaction,
  'id' | 'transactionMargin' | 'createdAt' | 'updatedAt' | 'transactionDate'
> & { transactionDate: string };

export enum TransactionError {
  Unknown = 'Unknown error',
}

export abstract class TransactionsRepositoryType {
  abstract createTransaction(transaction: Transaction): Promise<unknown>;
}

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepositoryType,
  ) {}

  async createTransaction(
    transactionDto: CreateTransactionDto,
  ): Promise<OperationResult<{ id: string }, TransactionError>> {
    try {
      const newTransaction = {
        ...transactionDto,
        transactionMargin:
          transactionDto.transactionNetValue - transactionDto.transactionCost,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uuidv4(),
        transactionDate: new Date(transactionDto.transactionDate),
      };
      await this.transactionsRepository.createTransaction(newTransaction);
      return succeed({ id: newTransaction.id });
    } catch (error) {
      console.error(error);
      return fail(TransactionError.Unknown);
    }
  }
}
