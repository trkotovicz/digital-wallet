import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TransactionService from '../services/Transactions';

export default class TransactionController {
  constructor(private transactionService: TransactionService) {}

  create = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { value, description, type } = req.body;
    const data = await this.transactionService.create(value, description, type, accountId);
    res.status(StatusCodes.CREATED).json(data);
  };
}
