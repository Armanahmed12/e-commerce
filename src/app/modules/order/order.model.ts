import { Schema, model } from 'mongoose';
import { OrderInterface } from './order.interface';

const orderSchema = new Schema<OrderInterface>({
  email: {
    type: String,
    required: true,
    match: [/@/, 'Email must contain "@" character'],
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensuring the price is non-negative
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensuring the quantity is at least 1
  },
});

export const OrderModel = model<OrderInterface>('Order', orderSchema);
