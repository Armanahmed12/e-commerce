import { OrderInterface } from "./order.interface";
import { OrderModel } from "./order.model";

// Create a New Order
const createANewOrderIntoDB = async( OrderData : OrderInterface ) =>{

      const result = await OrderModel.create(OrderData);
      return result;
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

}