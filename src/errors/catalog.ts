import { StatusCodes } from "http-status-codes";

export enum ErrorTypes {
  GenericError = "GenericError",
  BadRequest = "BadRequest",
  DocumentConflictError = "DocumentConflictError",
  AccountConflictError = "AccountConflictError",
  UnauthorizedError = "UnauthorizedError",
  InvalidToken = "InvalidToken",
  InvalidDocument = "InvalidDocument",
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
  AccountConflictError: {
    message: "Account is already in use",
    httpStatus: StatusCodes.CONFLICT,
  },
  DocumentConflictError: {
    message: "Document is already in use",
    httpStatus: StatusCodes.CONFLICT,
  },
  UnauthorizedError: {
    message: "Invalid login data",
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  InvalidToken: {
    message: "Invalid or Expired Token",
    httpStatus: StatusCodes.UNAUTHORIZED,
  },
  InvalidDocument: {
    message: "Invalid Document",
    httpStatus: StatusCodes.BAD_REQUEST,
  },
};
