import { Router } from 'express';
import { accountController, cardController, transactionController } from './main';

const accountRouter = Router();

accountRouter.post("/accounts", accountController.create);
accountRouter.get('/accounts', accountController.list);
accountRouter.post("/accounts/:accountId/cards", cardController.create);
accountRouter.get("/accounts/cards", cardController.list);
accountRouter.post("/accounts/:accountId/transactions", transactionController.create);

export default accountRouter;
