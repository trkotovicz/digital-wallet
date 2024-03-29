import { NextFunction, Request, Response } from "express";
import { ErrorTypes } from "../errors/catalog";
import JwtService from "../utils/jwt";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new Error(ErrorTypes.InvalidToken);
  }

  try {
    JwtService.validateToken(authorization);
    return next();
  } catch (error) {
    throw new Error(ErrorTypes.InvalidToken);
  }
}
