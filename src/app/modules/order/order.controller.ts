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

// get all Orders from database Or specific orders with query string
const getAllOrSpecificOrders = async (req: Request, res: Response) => {

    try {
  
      const isExistedEmail = req.query.email;

      if (isExistedEmail) {
        const result = await OrderServices.getAllOrSpecificOrdersFromDB(
            isExistedEmail as string,
        );
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
       
      } 
      else {
        const result = await OrderServices.getAllOrSpecificOrdersFromDB(false);
        
        res.status(200).json({
          success: true,
          message:  "Orders fetched successfully!",
          data: result,
        });
  
      }
    } catch (err) {
      console.log(err);
    }
  };


export const OrderController = {

    insertOrderData,
    getAllOrSpecificOrders,
}