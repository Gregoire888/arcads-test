import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TEST_DB_MODULE } from '../src/utils/test-utils';
import { ReportsModule } from '../src/reports/reports.module';
import { Transaction } from '../src/types/transaction';
import { DataSource, Repository } from 'typeorm';
import { TransactionEntity } from '../src/db/entities';
import { DUMMY_FIXTURES } from './transactions.fixtures';

describe('ReportsController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Transaction>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TEST_DB_MODULE, ReportsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    repository = dataSource.getRepository(TransactionEntity);
    await repository.save(DUMMY_FIXTURES);
  });

  describe('/reports/highest-margin (GET)', () => {
    it('should return the transactions with the highest margin', async () => {
      return request(app.getHttpServer())
        .get('/reports/highest-margin')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            DUMMY_FIXTURES.slice(DUMMY_FIXTURES.length - 5)
              .reverse()
              .map(({ transactionDate, createdAt, updatedAt, ...rest }) => ({
                transactionDate: transactionDate.toISOString(),
                createdAt: createdAt.toISOString(),
                updatedAt: updatedAt.toISOString(),
                ...rest,
              })),
          );
        });
    });
  });

  describe('/reports/weekly-average-margin (GET)', () => {
    it('should return the average margin per week', async () => {
      return request(app.getHttpServer())
        .get('/reports/weekly-average-margin')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({
            averageMarginEvolutionInPercentage: 157.14,
            currentWeekAvgMargin: 81,
            previousWeekAvgMargin: 31.5,
          });
        });
    });
  });

  describe('/reports/city-performance (GET)', () => {
    it('should return the average margin per city', async () => {
      return request(app.getHttpServer())
        .get('/reports/city-performance')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual([
            {
              city: 'London',
              averageMargin: 81,
            },
            {
              city: 'Stockholm',
              averageMargin: 45,
            },
            {
              city: 'Paris',
              averageMargin: 18,
            },
          ]);
        });
    });
  });
});
