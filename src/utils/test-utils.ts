import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const TEST_DB_CONFIG: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: ':memory:',
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + '/../db/entities/*.entity.{js,ts}'],
  dropSchema: true,
  keepConnectionAlive: true,
  retryAttempts: 0,
};

export const TEST_DB_MODULE = TypeOrmModule.forRoot(TEST_DB_CONFIG);
