import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
// import { ReportsModule } from './reports/reports.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
console.log('DATABASE_URL', process.env.NODE_ENV);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV === 'development',
      ssl: false,
      entities: [__dirname + '/db/entities/*.entity.{js,ts}'],
    }),
    TransactionsModule,
  ],
})
export class AppModule {}
