import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/modules/middlewares/errorHandler';
import route from './app/router';
import cookieParser from 'cookie-parser';
const app: Application = express();


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
// app.use(cors()); this sutpid line of code was causing the issue of cors
app.use(cookieParser())
app.use('/api', route);


app.get('/', (req: Request, res: Response) => {
    res.send({
        status: 200,
        message: "book-shop server is running..... .... ... .. ."
    })
});


app.use(globalErrorHandler)

export default app;