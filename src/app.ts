import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app = express();

// parsers are here
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes)

app.use('/api/orders', OrderRoutes);

const getController = (req: Request, res: Response) => {

  res.json({ a: 10 });
  
};

app.get('/', getController);

export default app;
