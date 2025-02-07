import express from 'express';
import { orderContrller } from './order.controller';

const router = express.Router();

router.post('/', orderContrller.createOrder);
router.get('/revenue', orderContrller.getRevenue);


export const orderRouter = router;