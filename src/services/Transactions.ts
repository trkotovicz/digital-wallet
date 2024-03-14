import { Repository } from "typeorm";
import { Transaction } from "../database/entity/Transaction";
import AccountService from "./AccountService";

export default class TransactionService {
  constructor(
    private transactionRepository: Repository<Transaction>,
    private accountService: AccountService
  ) {}
}
