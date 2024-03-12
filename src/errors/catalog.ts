import { StatusCodes } from "http-status-codes";

export enum ErrorTypes {
  GenericError = "GenericError",
  BadRequest = "BadRequest",
  UnauthorizedError = "UnauthorizedError",
  InvalidToken = "InvalidToken",
}

interface ErrorResponseObject {
  message: string;
  httpStatus: number;
}

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject;
};

export const errorCatalog: ErrorCatalog = {
  GenericError: {
    message: "Internal error",
    httpStatus: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  BadRequest: {
    message: "Something wrong happened",
    httpStatus: StatusCodes.BAD_REQUEST,
  },
  UnauthorizedError: {
    message: "Invalid username or password",
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  InvalidToken: {
    message: "Invalid Token",
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
};
