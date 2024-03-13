import { Router } from 'express';
import { personController } from './main';

const personRouter = Router();

personRouter.post('/people', personController.create);

export default personRouter;