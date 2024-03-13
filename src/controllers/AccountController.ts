import { Request, Response } from "express";
import AccountService from "../services/AccountService";
import { StatusCodes } from 'http-status-codes';
import JwtService from '../utils/jwt';

export default class AccountController {
  constructor(private accountService: AccountService) {}

  create = async (req: Request, res: Response) => {
    const { branch, account } = req.body;
    const token = req.headers.authorization;
    const { document } = JwtService.validateToken(token);

    const data = await this.accountService.create(branch, account, document);
    res.status(StatusCodes.CREATED).json(data);
  };
  
  list = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { document } = JwtService.validateToken(token);

    const data = await this.accountService.list(document)
    res.status(StatusCodes.CREATED).json(data);
  };
}
