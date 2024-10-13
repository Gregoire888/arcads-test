import { Test, TestingModule } from '@nestjs/testing';
import {
  TransactionsService,
  CreateTransactionDto,
  TransactionError,
} from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PropertyType } from '../types/transaction';
import { succeed, fail } from '../utils/operation-result';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

const DUMMY_TRANSACTION: CreateTransactionDto = {
  transactionDate: new Date().toISOString(),
  transactionNetValue: 100,
  transactionCost: 10,
  propertyType: PropertyType.Apartment,
  city: 'Test City',
  area: 50,
};

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;

  const serviceMock = {
    createTransaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsController,
        { provide: TransactionsService, useValue: serviceMock },
      ],
    }).compile();

    transactionsController = app.get<TransactionsController>(
      TransactionsController,
    );
  });

  describe('createTransaction', () => {
    it('should return a bad request exception if the dto is invalid', async () => {
      // @ts-expect-error invalid dto
      const creationPromise = transactionsController.createTransaction({});
      await expect(creationPromise).rejects.toThrow(BadRequestException);
      expect(serviceMock.createTransaction).not.toHaveBeenCalled();
    });

    it('should call transactionService.createTransaction and return the data', async () => {
      serviceMock.createTransaction.mockResolvedValue(succeed({ id: '1' }));
      const result =
        await transactionsController.createTransaction(DUMMY_TRANSACTION);
      expect(result).toEqual({ id: '1' });
      expect(serviceMock.createTransaction).toHaveBeenCalledTimes(1);
      expect(serviceMock.createTransaction).toHaveBeenCalledWith(
        DUMMY_TRANSACTION,
      );
    });

    it('should throw an internal server error if the service returns a failure', async () => {
      serviceMock.createTransaction.mockResolvedValue(
        fail(TransactionError.Unknown),
      );
      const creationPromise =
        transactionsController.createTransaction(DUMMY_TRANSACTION);
      await expect(creationPromise).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(serviceMock.createTransaction).toHaveBeenCalledTimes(1);
      expect(serviceMock.createTransaction).toHaveBeenCalledWith(
        DUMMY_TRANSACTION,
      );
    });
  });
});
