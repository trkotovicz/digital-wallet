import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../middlewares/paginationMiddleware";
import AccountService from "../services/AccountService";
import JwtService from "../utils/jwt";

export default class AccountController {
  constructor(private accountService: AccountService) {}

  create = async (req: Request, res: Response) => {
    const { branch, account } = req.body;
    const token = req.headers.authorization;
    const { document } = JwtService.validateToken(token);

    const data = await this.accountService.create(branch, account, document);
    res.status(StatusCodes.CREATED).json(data);
  };

  list = async (req: CustomRequest, res: Response) => {
    const token = req.headers.authorization;
    const { itemsPerPage, currentPage } = req.pagination;
    const { document } = JwtService.validateToken(token);

    const { accounts } = await this.accountService.list(document);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginatedAccounts = accounts.slice(startIndex, endIndex);

    const data = {
      accounts: paginatedAccounts,
      pagination: {
        totalCount: accounts.length,
        itemsPerPage,
        currentPage,
        pageCount: Math.ceil(accounts.length / itemsPerPage),
      },
    };

    res.status(StatusCodes.CREATED).json(data);
  };

  getAccountBalance = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const data = await this.accountService.getAccountBalance(accountId);
    res.status(StatusCodes.OK).json(data);
  };
}
