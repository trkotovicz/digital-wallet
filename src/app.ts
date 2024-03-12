import cors from "cors";
import express from "express";
import "express-async-errors";
import errorHandler from './middlewares/errorHandler';
import routesHandler from './middlewares/routesHandler';

const app = express();
app.use(express.json());
app.use(cors());

app.use(errorHandler);
app.use(routesHandler);

export default app;
