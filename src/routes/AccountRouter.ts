import { Router } from 'express';
import { accountController } from './main';

const accountRouter = Router();

accountRouter.post("/accounts", accountController.createNewAccount);
accountRouter.get('/accounts', accountController.list);
accountRouter.post("/accounts/:accountId/cards", accountController.createNewCard);

export default accountRouter;
