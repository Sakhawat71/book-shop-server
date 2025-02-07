import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bookRouter } from './app/modules/book/book.route';
import { orderRouter } from './app/modules/order/order.route';
import globalErrorHandler from './app/modules/middlewares/errorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());


app.use('/api/products', bookRouter);
app.use('/api/orders',orderRouter);


app.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200,
        message: "book-shop server is running..... .... ... .. ."
    })
});

app.use(globalErrorHandler)

export default app;