import { Router } from 'express';
import { accountController } from './main';

const accountRouter = Router();

accountRouter.post("/accounts", accountController.create);

export default accountRouter;
