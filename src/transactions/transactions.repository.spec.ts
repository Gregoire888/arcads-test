import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsRepository } from './transactions.repository';
import { PropertyType, Transaction } from '../types/transaction';
import { TEST_DB_MODULE } from '../utils/test-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../db/entities';

const DUMMY_TRANSACTION: Transaction = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  transactionDate: new Date(),
  transactionNetValue: 100,
  transactionCost: 10,
  propertyType: PropertyType.Apartment,
  city: 'Test City',
  area: 50,
  transactionMargin: 90,
};

describe('TransactionsRepository', () => {
  let transactionsRepository: TransactionsRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      imports: [TEST_DB_MODULE, TypeOrmModule.forFeature([TransactionEntity])],
      providers: [TransactionsRepository],
    }).compile();

    transactionsRepository = app.get<TransactionsRepository>(
      TransactionsRepository,
    );
  });

  describe('createTransaction', () => {
    it('should create a transaction in DB', async () => {
      const creationResult =
        await transactionsRepository.createTransaction(DUMMY_TRANSACTION);
      expect(creationResult).toEqual(DUMMY_TRANSACTION);
      const repository = transactionsRepository['repository'];
      const transaction = await repository.findOneBy({
        id: DUMMY_TRANSACTION.id,
      });
      expect(transaction).toEqual(DUMMY_TRANSACTION);
    });
  });
});
