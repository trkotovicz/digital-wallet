import { Router } from "express";
import pagination from "../middlewares/paginationMiddleware";
import {
  accountController,
  cardController,
  transactionController,
} from "./main";

const accountRouter = Router();

accountRouter.post("/accounts", accountController.create);
accountRouter.get("/accounts", pagination, accountController.list);
accountRouter.get("/accounts/cards", pagination, cardController.list);
accountRouter.get(
  "/accounts/:accountId/balance",
  accountController.getAccountBalance
);
accountRouter.post("/accounts/:accountId/cards", cardController.create);
accountRouter.post(
  "/accounts/:accountId/transactions",
  transactionController.create
);
accountRouter.get(
  "/accounts/:accountId/transactions",
  pagination,
  transactionController.getTransactionsByAccount
);

export default accountRouter;
