import express from 'express';
import { orderContrller } from './order.controller';

const router = express.Router();

router.get('/', orderContrller.getOrders);
router.get('/:email', orderContrller.getSingleOrder);
router.post('/create-order', orderContrller.createOrder);
router.get('/revenue', orderContrller.getRevenue);
router.get("/verify", orderContrller.verifyPayment);


export const orderRouter = router;