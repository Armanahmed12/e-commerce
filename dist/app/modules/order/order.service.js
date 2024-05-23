"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const mongodb_1 = require("mongodb");
// Create a New Order
const createANewOrderIntoDB = (OrderData) => __awaiter(void 0, void 0, void 0, function* () {
    const createdOrder = yield order_model_1.OrderModel.create(OrderData);
    return createdOrder;
});
// finding a specific pd with Order's productId field to UPdate from DB
const findPdWithOrderPdIdToUpdateQuantityFromDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPdDocWithOrderId = yield product_model_1.ProductModel.findOne({
        _id: new mongodb_1.ObjectId(orderData.productId),
    });
    //  if we get any pd based or "orderData's" productId field
    if (foundPdDocWithOrderId) {
        // The found pd's quantity & inStock's value
        const { quantity, inStock } = foundPdDocWithOrderId.inventory;
        if (quantity >= orderData.quantity && inStock) {
            const restQuantity = quantity - orderData.quantity;
            const hasInStock = quantity == 1 ? false : true;
            yield product_model_1.ProductModel.updateOne({ _id: new mongodb_1.ObjectId(orderData.productId) }, {
                $set: { inventory: { quantity: restQuantity, inStock: hasInStock } },
            });
            return { success: true };
        }
        //  when pd's quantity is less than Order's quantity.
        else if (quantity < orderData.quantity) {
            return {
                success: false,
                message: 'Insufficient quantity available in inventory.',
            };
        }
    }
    // if orderData's productId doesn't match any pd's _id of db
    return { success: false, message: 'Order not found' };
});
// get all Or specific orders from DB
const getAllOrSpecificOrdersFromDB = (hasQueryParam) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof hasQueryParam == 'string') {
        const regex = new RegExp(hasQueryParam, 'i');
        const docs = yield order_model_1.OrderModel.find({ email: regex });
        return docs;
    }
    else {
        return yield order_model_1.OrderModel.find();
    }
});
exports.OrderServices = {
    createANewOrderIntoDB,
    getAllOrSpecificOrdersFromDB,
    findPdWithOrderPdIdToUpdateQuantityFromDB,
};
