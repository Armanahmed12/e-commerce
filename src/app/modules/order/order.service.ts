import { ProductModel } from "../product/product.model";
import { OrderInterface } from "./order.interface";
import { OrderModel } from "./order.model";
import { ObjectId } from 'mongodb';

// Create a New Order
const createANewOrderIntoDB = async( OrderData : OrderInterface ) =>{

      const createdOrder = await OrderModel.create(OrderData); 
      return createdOrder;
     
}

// finding a specific pd with Order's productId field to UPdate from DB

const findPdWithOrderPdIdToUpdateQuantityFromDB = async( orderData : OrderInterface ) =>{

    const foundPdDocWithOrderId = await ProductModel.findOne( { _id : new ObjectId(orderData.productId) } );

    //  if we get any pd based or "orderData's" productId field
    if(foundPdDocWithOrderId){

     // The found pd's quantity & inStock's value
        const { quantity, inStock } = foundPdDocWithOrderId.inventory;

     if(quantity >= orderData.quantity && inStock){

            const restQuantity = quantity - orderData.quantity;
            const hasInStock = (quantity == 1) ? false : true;
            await ProductModel.updateOne(
             {_id : new ObjectId(orderData.productId)},
             { $set : { inventory : { quantity : restQuantity, inStock : hasInStock } } }
         );
         return { success : true, message : "One specific pd's quantity has been decreased in DB" }
     }

    //  when pd's quantity is less than Order's quantity.
     else if(quantity < orderData.quantity){

        return { success : false, message : "insufficient stock! following your ordered's product quantity." }
           
     }

    }


    // if orderData's productId doesn't match any pd's _id of db
    return { success : false, message : "No Product data found with Order's productId"};
}


// get all Or specific orders from DB
const getAllOrSpecificOrdersFromDB = async(hasQueryParam: boolean | string) =>{

    if (typeof hasQueryParam == 'string') {
        const regex = new RegExp(hasQueryParam, 'i');
        const docs = await OrderModel.find({ email : regex });
        return docs;
      }
       else {
        return await OrderModel.find();
      }
}


export const OrderServices = {

    createANewOrderIntoDB,
    getAllOrSpecificOrdersFromDB,
    findPdWithOrderPdIdToUpdateQuantityFromDB

}