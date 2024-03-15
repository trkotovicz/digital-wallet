import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  pagination: {
    itemsPerPage: number;
    currentPage: number;
  };
}

const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE = 1;

export default function pagination(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const { itemsPerPage, currentPage } = req.query;

  const perPage = parseInt(itemsPerPage as string) || DEFAULT_ITEMS_PER_PAGE;
  const page = parseInt(currentPage as string) || DEFAULT_CURRENT_PAGE;

  req.pagination = {
    itemsPerPage: perPage,
    currentPage: page,
  };

  next();
}
