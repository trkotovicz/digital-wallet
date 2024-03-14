export interface ITransaction {
  id: string;
  value: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionList {
  transactions: ITransaction[];
}
