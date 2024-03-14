import { TransactionType } from '../database/entity/Transaction';


export interface ITransaction {
  value: number;
  description: string;
  type: TransactionType
}

export interface ITransactionList {
  transactions: ITransaction[];
}
