import { Repository } from 'typeorm';
import { Account } from '../database/entity/Account';
import { IAccount } from '../interfaces/IAccount';
import { newAccountSchema } from '../utils/validations/account.validations';
import { ErrorTypes } from '../errors/catalog';
import { randomUUID } from 'crypto';

export default class AccountService {
  constructor (private accountRepository: Repository<Account>) { }

  create = async (branch: number, account: number, document: string): Promise<IAccount> => {
    newAccountSchema({ branch, account });

    if (await this.exists(account)) throw new Error(ErrorTypes.AccountConflictError)

    const data = this.accountRepository.create({
      id: randomUUID(),
      branch,
      account,
      document
    });

    await this.accountRepository.save(data);

    return {
      id: data.id,
      branch: data.branch,
      account: data.account,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  }

  exists = async (account: number): Promise<boolean> => {
    return await this.accountRepository.exists({ where: { account } });
  }
}