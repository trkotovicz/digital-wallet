import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { Account } from "../database/entity/Account";
import { ErrorTypes } from "../errors/catalog";
import { IAccount, IAccountList } from "../interfaces/IAccount";
import { newAccountSchema } from "../utils/validations/account.validations";

export default class AccountService {
  constructor(private accountRepository: Repository<Account>) {}

  existsAccount = async (account: string): Promise<boolean> => {
    return await this.accountRepository.exists({ where: { account } });
  };

  create = async (
    branch: string,
    account: string,
    document: string
  ): Promise<IAccount> => {
    newAccountSchema({ branch, account });

    const maskedAccount = account.slice(0, 7) + "-" + account.slice(7);

    if (await this.existsAccount(maskedAccount))
      throw new Error(ErrorTypes.AccountConflictError);

    const data = this.accountRepository.create({
      id: randomUUID(),
      branch,
      account: maskedAccount,
      document,
    });

    await this.accountRepository.save(data);

    return {
      id: data.id,
      branch: data.branch,
      account: data.account,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  };

  list = async (document: string): Promise<IAccountList> => {
    return {
      accounts: await this.accountRepository.find({
        where: { document },
        select: ["id", "branch", "account", "createdAt", "updatedAt"],
      }),
    };
  };

  findAccountById = async (accountId: string): Promise<Account> => {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });
    if (!account) throw new Error(ErrorTypes.AccountNotFound);
    return account;
  };

  getAccountBalance = async (accountId: string) => {
    const { balance } = await this.findAccountById(accountId);
    return { balance: Number(balance) };
  }

  updateBalanceAccount = async (accountId: string, value: number) => {
    const account = await this.findAccountById(accountId);
    const newBalance = Number(account.balance) - value;

    if (value > Number(account.balance)) throw new Error(ErrorTypes.InsufficientFunds);

    account.balance = String(newBalance);
    const data = await this.accountRepository.save(account);
    return data;
  };
}
