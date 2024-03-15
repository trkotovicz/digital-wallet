import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../middlewares/paginationMiddleware";
import TransactionService from "../services/Transactions";

export default class TransactionController {
  constructor(private transactionService: TransactionService) {}

  create = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { value, description, type } = req.body;
    const data = await this.transactionService.create(
      value,
      description,
      type,
      accountId
    );
    res.status(StatusCodes.CREATED).json(data);
  };

  getTransactionsByAccount = async (req: CustomRequest, res: Response) => {
    const { accountId } = req.params;
    const { type: transactionType, search: transactionSearch } = req.query;
    const { itemsPerPage, currentPage } = req.pagination;

    const { transactions } =
      await this.transactionService.getTransactionsByAccount(
        accountId,
        transactionType as string,
        transactionSearch as string
      );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    const data = {
      transactions: paginatedTransactions,
      pagination: {
        totalCount: transactions.length,
        itemsPerPage,
        currentPage,
        pageCount: Math.ceil(transactions.length / itemsPerPage),
      },
    };

    res.status(StatusCodes.OK).json(data);
  };
}
