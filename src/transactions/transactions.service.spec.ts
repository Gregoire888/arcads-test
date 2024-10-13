import { Test, TestingModule } from '@nestjs/testing';
import {
  TransactionsService,
  TransactionsRepositoryType,
  CreateTransactionDto,
  TransactionError,
} from './transactions.service';
import { PropertyType } from '../types/transaction';
import { isFailure, isSuccess } from '../utils/operation-result';

const DUMMY_TRANSACTION: CreateTransactionDto = {
  transactionDate: new Date().toISOString(),
  transactionNetValue: 100,
  transactionCost: 10,
  propertyType: PropertyType.Apartment,
  city: 'Test City',
  area: 50,
};

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;

  const repositoryMock = {
    createTransaction: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: TransactionsRepositoryType, useValue: repositoryMock },
      ],
    }).compile();

    transactionsService = app.get<TransactionsService>(TransactionsService);
  });

  describe('createTransaction', () => {
    it('should properly create a transaction and return a success result', async () => {
      const result =
        await transactionsService.createTransaction(DUMMY_TRANSACTION);
      expect(isSuccess(result)).toBe(true);
      // @TODO add expectSuccess and expectFailure helpers
      // @ts-expect-error result is not typed as Success as we don't use isSuccess's return value
      expect(typeof result.data.id).toEqual('string');
      expect(repositoryMock.createTransaction).toHaveBeenCalledTimes(1);
      expect(repositoryMock.createTransaction).toHaveBeenCalledWith({
        ...DUMMY_TRANSACTION,
        id: expect.any(String),
        transactionMargin:
          DUMMY_TRANSACTION.transactionNetValue -
          DUMMY_TRANSACTION.transactionCost,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        transactionDate: expect.any(Date),
      });
    });

    it('should return a failure result on error', async () => {
      repositoryMock.createTransaction.mockRejectedValue(new Error());
      const result =
        await transactionsService.createTransaction(DUMMY_TRANSACTION);
      expect(isFailure(result)).toBe(true);
      // @ts-expect-error result is not typed as Failure as we don't use isFailure's return value
      expect(result.reason).toEqual(TransactionError.Unknown);
    });
  });
});
