# Dynamic Arcads Real Estate

## Description

This application is a real estate transactions monitoring platform that allows create transactions and retrieve report data.

## Installation

```bash
# Setup the database
$ docker-compose up -d
# Install dependencies
$ yarn install
# Create .env file
$ cp .env.example .env
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Technologies

This application is built with the [Nest](https://github.com/nestjs/nest) framework.
The database is a PostgreSQL instance.

For API documentation, the [Swagger](https://swagger.io/) module is used.

### Dependencies

| Dependency | Purpose |
|------------|---------|
| [PostgreSQL](https://www.postgresql.org/) | Database |
| [TypeORM](https://typeorm.io/) | Database ORM |
| [Swagger](https://swagger.io/) | API documentation |
| [class-validator](https://github.com/typestack/class-validator) | API data validation |
| [class-transformer](https://github.com/typestack/class-transformer) | API data serialization |

## Design decisions

### Data model

The data model is designed to be as simple as possible. It is composed of only one table for the transactions.

#### Transaction

| Column        | Type          | Unique | Indexed |
| ------------- | ------------- | ------ | ------- |
| id            | uuid          | Yes    | Yes     |
| createdAt     | timestamp     | No     | No      |
| updatedAt     | timestamp     | No     | No      |
| transactionDate | timestamp     | No     | No      |
| transactionNetValue         | integer       | No     | Yes      |
| transactionCost         | integer       | No     | No      |
| transactionMargin         | integer       | No     | Yes     |
| propertyType  | enum('Apartment', 'House', 'Land')   | No     | No      |
| city          | varchar(255)   | No     | No      |
| area          | integer        | No     | No      |

##### Indexes

- `city`: Used for the city performance report.
- `transactionMargin`: Used for the weekly average margin report.
- `transactionDate`: Used for the weekly average margin report.
- `transactionNetValue`: Used for the highest margin transaction report.

##### The `margin` column

The `margin` column is a calculated column that is computed when a transaction is created. It is computed by subtracting the `transactionNetValue` from the `transactionCost`.

As several report data are based on the margin, it was decided to store it in the database. An approrite method could be a computed column in the database.

However, to avoid business logic in the database, the margin is computed in the application.
It should be indexed for query performance.

### API

The API is a REST API with the following endpoints:

- `POST /transactions`: Create a new transaction.
- `GET /reports/highest-margin`: Get the top 5 transactions with the highest margin.
- `GET /reports/weekly-average-margin`: Get the average margin for the last week and its change compared to the previous week.
- `GET /reports/city-performance`: Get the top 5 cities by average margin.

When your application is running, you can access the API documentation at `http://localhost:3000/api`.

### Application architecture

The application is organized into modules. Each module is responsible for a specific feature.

#### Module architecture

As the application is rather light-weight and simple (i.e. no heavy business logic), using patterns such as clean architecture seems rather overkill. Furthermore, embracing the NestJs framework, the `Controller/Service/Repository` layers approach is the default choice and would allow to onboard new developers quickly.

**Dependency inversion** on the `service` layer

By default, the service layer is dependent on the repository layer. However, to allow independency of the service layer as it holds the business logic, it should declare abstractions for the repository layer.

This allows decoupling the service layer from the database.

##### Layers & Responsibilities

- **Controllers** are responsible for handling incoming requests and returning responses to the client.
- **Services** contain the business logic.
- **Repositories** are responsible for data manipulation.

#### The `Transaction` module

This module is responsible for creating transactions.

**Components:**

- `TransactionController`: Handles the incoming requests and returns the responses.
- `TransactionService`: Contains the business logic.
- `TransactionRepository`: Is responsible for transaction creation.

#### The `Report` module

This module is responsible for computing and retrieving report data.

**Components:**

- `ReportController`: Handles the incoming requests and returns the responses.
- `ReportService`: Contains the business logic.
- `TransactionRepository`: Is responsible for retrieving report data.

### Testing strategy

Each layer should be tested separately by mocking the lower layers in unit tests.

To ensure the layers are working well together, integration tests are written. They cover the API endpoints. To keep the tests light, the database is in-memory.
Integration test should include consecutive calls to the API.

Unit tests are written using the [Jest](https://jestjs.io/) framework. They cover the business logic of the application.

E2E tests are written using the [Supertest](https://github.com/ladjs/supertest) library and are placed in the `src/test` folder. They cover the API endpoints.

## Known issues

- DB indices to add
- use Nest ConfigService or equivalent for env handling
- use Nest Logger instead of console.log
- add swagger tags

## Final thoughts

In order to save some time while still showcasing the whole process, I didn't test the reports module's components as I did for the transactions module.
I guess IRL I would also prioritize integration tests if time doesn't allow both.
This ensures a behaviour and thus gives better protection against future regressions.
