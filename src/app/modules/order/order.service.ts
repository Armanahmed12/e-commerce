import { OrderInterface } from "./order.interface";
import { OrderModel } from "./order.model";

// Create a New Order
const createANewOrderIntoDB = async( OrderData : OrderInterface ) =>{

      const result = await OrderModel.create(OrderData);
      return result;
}

export const OrderServices = {

    createANewOrderIntoDB,

}