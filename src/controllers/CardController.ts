import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CardService from '../services/CardService';

export default class CardController {
  constructor(private cardService: CardService) {}

  create = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { type, number, cvv } = req.body;

    const data = await this.cardService.create(
      type,
      number,
      cvv,
      accountId
    );
    res.status(StatusCodes.CREATED).json(data);
  };
}
