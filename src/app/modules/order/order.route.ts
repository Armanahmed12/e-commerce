import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/', OrderController.insertOrderData);
router.get('/', OrderController.getAllOrSpecificOrders);

router.get('*', (req, res)=>{
    
    res.status(404).json({
        success: false,
        message: 'Route not found.',
      });

  });


export const OrderRoutes = router;
