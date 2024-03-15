import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "../middlewares/paginationMiddleware";
import CardService from "../services/CardService";
import JwtService from "../utils/jwt";

export default class CardController {
  constructor(private cardService: CardService) {}

  create = async (req: Request, res: Response) => {
    const { accountId } = req.params;
    const { type, number, cvv } = req.body;

    const data = await this.cardService.create(type, number, cvv, accountId);
    res.status(StatusCodes.CREATED).json(data);
  };

  list = async (req: CustomRequest, res: Response) => {
    const token = req.headers.authorization;
    const { itemsPerPage, currentPage } = req.pagination;
    const { document } = JwtService.validateToken(token);

    const { cards } = await this.cardService.list(document);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginatedCards = cards.slice(startIndex, endIndex);

    const data = {
      cards: paginatedCards,
      pagination: {
        totalCount: cards.length,
        itemsPerPage,
        currentPage,
        pageCount: Math.ceil(cards.length / itemsPerPage),
      },
    };

    res.status(StatusCodes.OK).json(data);
  };
}
