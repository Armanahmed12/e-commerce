import { ProductModel } from "../product/product.model";
import { OrderInterface } from "./order.interface";
import { OrderModel } from "./order.model";


// Create a New Order
const createANewOrderIntoDB = async( OrderData : OrderInterface ) =>{

      const createdOrder = await OrderModel.create(OrderData); 
      return createdOrder;
     
}

// // finding a specific doc with Id from products collection DB 
    //   const foundPdDocWithOrderId = await ProductModel.findOne( { _id : new ObjectId(createdOrder.productId) } );
      
    //    if(foundPdDocWithOrderId){

    //     // The found pd's quantity & inStock's value
    //        const { quantity, inStock } = foundPdDocWithOrderId.inventory;
    //     if(quantity > createdOrder.quantity){

    //            console.log("big", 'fpd=', quantity, 'OQan', createdOrder.quantity);
    //            const restQuantity = quantity - createdOrder.quantity;
    //            await ProductModel.updateOne(
    //             {_id : new ObjectId(createdOrder.productId)},
    //             { $set : { inventory : { quantity : restQuantity } } }
    //         )  
    //     }
    //     else if(quantity < createdOrder.quantity){

    //           console.log("insufficient stock! following your ordered product quantity.")
              
    //     }

    //    }


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

}