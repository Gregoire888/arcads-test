import { Column, Entity, PrimaryColumn } from 'typeorm';
import { PropertyType } from '../../types/transaction';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'transaction_date' })
  transactionDate!: Date;

  @Column({ name: 'transaction_net_value' })
  transactionNetValue!: number;

  @Column({ name: 'transaction_cost' })
  transactionCost!: number;

  @Column({ name: 'transaction_margin' })
  transactionMargin!: number;

  @Column({ name: 'property_type' })
  propertyType!: PropertyType;

  @Column()
  city!: string;

  @Column()
  area!: number;
}
