import express, { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

// adding an order to db with modifying the a pd's quantity by productId of "Order" Data.
const insertOrderData = async (req: Request, res: Response) => {

  try {
    const orderData = req.body;
    // Data validation with Zod
    const parsedDataWithZod = orderValidationSchema.parse(orderData);
    // if the below func gives positive response, Order will be taken otherwise doesn't

    const result =
      await OrderServices.findPdWithOrderPdIdToUpdateQuantityFromDB(
        parsedDataWithZod,
      );
        
      // for positive response
    if (result.success) {
      const createdOrderIntoDB =
        await OrderServices.createANewOrderIntoDB(parsedDataWithZod);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: createdOrderIntoDB,
      });
    } 
    // negative response
    else if (!result.success) {
      res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } 

  // catch block if there is any err inside the try block
  catch (err) {
    res.status(500).json({
      success: false,
      message: "Order not found",
    }); 
   }

};

// get all Orders from database Or specific orders with query string
const getAllOrSpecificOrders = async (req: Request, res: Response) => {

  try {

    let {email} = req.query;
    let isExistedEmail = email ? true : false;
    
    // this "if" condition will check in db to know if there are docs in bd with this email. if there is no data, return this func from inside.
    if(isExistedEmail){

      const result = await OrderServices.getAllOrSpecificOrdersFromDB(
        email as string,
      );
    
        if(result.length == 0){

          res.status(500).json({
            success: false,
            message: "Order not found"
          }); 
        }

    }

    // all orders which are found by the email inside db.
    if (isExistedEmail) {
     
      const result = await OrderServices.getAllOrSpecificOrdersFromDB(
        email as string,
      );

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } 
    
    // all orders from db
    else if(isExistedEmail == false) {

      const result = await OrderServices.getAllOrSpecificOrdersFromDB(false);

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }


  } catch (err) {
     res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    }); 
  }


};

export const OrderController = {
  insertOrderData,
  getAllOrSpecificOrders,
};
