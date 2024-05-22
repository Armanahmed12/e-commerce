import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.insertOrderData);
router.get('/', OrderController.getAllOrSpecificOrders);

export const OrderRoutes = router;
