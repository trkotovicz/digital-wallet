import { Router } from 'express';
import { accountController, cardController, transactionController } from './main';

const accountRouter = Router();

accountRouter.post("/accounts", accountController.create);
accountRouter.get('/accounts', accountController.list);
accountRouter.get("/accounts/cards", cardController.list);
accountRouter.get("/accounts/:accountId/balance", accountController.getAccountBalance);
accountRouter.post("/accounts/:accountId/cards", cardController.create);
accountRouter.post("/accounts/:accountId/transactions", transactionController.create);
accountRouter.get("/accounts/:accountId/transactions", transactionController.getTransactionsByAccount);

export default accountRouter;
