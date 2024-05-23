import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app = express();

// parsers are here
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.use('/api/', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

app.get('/', (req, res) =>{

  res.status(200).json({
    success: true,
    message: 'Welcome to e-commerce web server mate!',
  });

})

export default app;
