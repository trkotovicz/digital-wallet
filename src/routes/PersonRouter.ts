import { Router } from 'express';
import { personController } from './main';

const personRouter = Router();

personRouter.post('/login', personController.login);
personRouter.post('/people', personController.create);

export default personRouter;