import express, {Request, Response} from 'express';
import { OrderServices } from "./order.service";

const insertOrderData = async( req : Request, res : Response ) =>{

         const orderData = req.body;
         const result = await OrderServices.createANewOrderIntoDB(orderData);

         res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
          });
}

export const OrderController = {

    insertOrderData
}