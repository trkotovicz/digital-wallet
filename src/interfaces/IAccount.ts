export interface IAccount {
  id: string;
  branch: string;
  account: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountList {
  accounts: IAccount[];
}
