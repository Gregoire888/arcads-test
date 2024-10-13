import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TEST_DB_MODULE } from '../src/utils/test-utils';
import { TransactionsModule } from '../src/transactions/transactions.module';
import { PropertyType, Transaction } from '../src/types/transaction';
import { DataSource, Repository } from 'typeorm';
import { TransactionEntity } from '../src/db/entities';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Transaction>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TEST_DB_MODULE, TransactionsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);

    repository = dataSource.getRepository(TransactionEntity);
  });

  it('/transactions (POST) should return a bad request exception if the dto is invalid', async () => {
    return request(app.getHttpServer())
      .post('/transactions')
      .send({
        transactionDate: new Date().toISOString(),
        transactionNetValue: 100,
        transactionCost: 10,
      })
      .expect(400);
  });

  it('/transactions (POST) should create a transaction and return its id', async () => {
    let id: string | undefined;

    const transactionDate = new Date().toISOString();

    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        transactionDate,
        transactionNetValue: 10,
        transactionCost: 1,
        propertyType: PropertyType.Apartment,
        city: 'Paris',
        area: 50,
      })
      .expect(201)
      .expect((res) => {
        id = res.body.id;
      });

    expect(id).toBeDefined();

    const transaction = await repository.findOneBy({ id });
    expect(transaction).toEqual({
      id,
      transactionDate: new Date(transactionDate),
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
      transactionNetValue: 10,
      transactionCost: 1,
      transactionMargin: 9,
      propertyType: PropertyType.Apartment,
      city: 'Paris',
      area: 50,
    });
  });
});
