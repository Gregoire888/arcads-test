import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../types/transaction';
import { TransactionsRepositoryType } from './transactions.service';
import { TransactionEntity } from '../db/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsRepository implements TransactionsRepositoryType {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.repository.save(transaction);
  }
}
