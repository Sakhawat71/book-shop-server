import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/modules/middlewares/errorHandler';
import route from './app/router';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api',route);


app.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200,
        message: "book-shop server is running..... .... ... .. ."
    })
});

app.use(globalErrorHandler)

export default app;