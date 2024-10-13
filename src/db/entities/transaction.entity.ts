import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PropertyType } from '../../types/transaction';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  transactionDate!: Date;

  @Column()
  transactionNetValue!: number;

  @Column()
  transactionCost!: number;

  @Column()
  transactionMargin!: number;

  @Column()
  propertyType!: PropertyType;

  @Column()
  city!: string;

  @Column()
  area!: number;
}
