import cors from "cors";
import express from "express";
import "express-async-errors";
import errorHandler from './middlewares/errorHandler';
import routesHandler from './middlewares/routesHandler';
import personRouter from './routes/PersonRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use(personRouter);

app.use(errorHandler);
app.use(routesHandler);

export default app;
