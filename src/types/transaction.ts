export enum PropertyType {
  Apartment = 'Apartment',
  House = 'House',
  Land = 'Land',
}

export interface Transaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  transactionDate: Date;
  transactionNetValue: number;
  transactionCost: number;
  transactionMargin: number;
  propertyType: PropertyType;
  city: string;
  area: number;
}
