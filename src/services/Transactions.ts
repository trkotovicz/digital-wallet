import { randomUUID } from "crypto";
import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Transaction, TransactionType } from "../database/entity/Transaction";
import { ErrorTypes } from "../errors/catalog";
import { ITransaction } from "../interfaces/ITransaction";
import { newTransactionSchema } from "../utils/validations/transaction.validations";
import AccountService from "./AccountService";

export default class TransactionService {
  constructor(
    private transactionRepository: Repository<Transaction>,
    private accountService: AccountService
  ) {}

  create = async (
    value: number,
    description: string,
    type: TransactionType,
    accountId: string
  ) => {
    newTransactionSchema({ value, description, type });
    if (type === TransactionType.CREDIT) {
      return await this.creditTransaction(value, description, accountId);
    }
    if (type === TransactionType.DEBIT) {
      return await this.debitTransaction(value, description, accountId);
    } else throw new Error(ErrorTypes.BadRequest);
  };

  creditTransaction = async (
    value: number,
    description: string,
    accountId: string
  ): Promise<ITransaction> => {
    const account = await this.accountService.findAccountById(accountId);
    const transaction = this.transactionRepository.create({
      id: randomUUID(),
      value,
      description,
      type: TransactionType.CREDIT,
      accountId: account,
    });
    const data = await this.transactionRepository.save(transaction);
    return {
      id: data.id,
      value: data.value,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  };

  debitTransaction = async (
    value: number,
    description: string,
    accountId: string
  ): Promise<ITransaction> => {
    try {
      const account = await this.accountService.updateBalanceAccount(
        accountId,
        value
      );
      const transaction = await this.transactionRepository.create({
        id: randomUUID(),
        value,
        description,
        type: TransactionType.DEBIT,
        accountId: account,
      });
      const data = await this.transactionRepository.save(transaction);
      return {
        id: data.id,
        value: data.value,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  getTransactionsByAccount = async (
    accountId: string,
    type?: string,
    search?: string
  ): Promise<{ transactions: ITransaction[] }> => {
    let queryBuilder: SelectQueryBuilder<Transaction> =
      AppDataSource.createQueryBuilder(Transaction, "transaction")
        .where("transaction.accountId = :accountId", { accountId })
        .select([
          "transaction.id",
          "transaction.value",
          "transaction.description",
          "transaction.createdAt",
          "transaction.updatedAt",
        ]);

    if (type) {
      queryBuilder = this.applyTypeFilter(queryBuilder, type);
    }
    if (search) {
      queryBuilder = this.applySearchFilter(queryBuilder, search);
    }

    const transactions = await queryBuilder.getMany();
    return { transactions };
  };

  private applyTypeFilter = (
    queryBuilder: SelectQueryBuilder<Transaction>,
    type: string
  ): SelectQueryBuilder<Transaction> => {
    return queryBuilder.andWhere("transaction.type = :type", { type });
  };

  private applySearchFilter = (
    queryBuilder: SelectQueryBuilder<Transaction>,
    search: string
  ): SelectQueryBuilder<Transaction> => {
    return queryBuilder.andWhere("LOWER(transaction.description) LIKE LOWER(:search)", {
      search: `%${search}%`,
    });
  };
}
