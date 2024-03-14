import { Router } from 'express';
import { accountController, cardController } from './main';

const accountRouter = Router();

accountRouter.post("/accounts", accountController.create);
accountRouter.get('/accounts', accountController.list);
accountRouter.post("/accounts/:accountId/cards", cardController.create);
accountRouter.get("/accounts/cards", cardController.list);

export default accountRouter;
