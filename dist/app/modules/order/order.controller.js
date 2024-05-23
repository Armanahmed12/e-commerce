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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
// adding an order to db with modifying the a pd's quantity by productId of "Order" Data.
const insertOrderData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // Data validation with Zod
        const parsedDataWithZod = order_validation_1.default.parse(orderData);
        // if the below func gives positive response, Order will be taken otherwise doesn't
        const result = yield order_service_1.OrderServices.findPdWithOrderPdIdToUpdateQuantityFromDB(parsedDataWithZod);
        // for positive response
        if (result.success) {
            const createdOrderIntoDB = yield order_service_1.OrderServices.createANewOrderIntoDB(parsedDataWithZod);
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
    catch (err) {
        // catch block if there is any err inside the try block
        res.status(500).json({
            success: false,
            message: 'Order not found',
        });
    }
});
// get all Orders from database Or specific orders with query string
const getAllOrSpecificOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const isExistedEmail = email ? true : false;
        // this "if" condition will check in db to know if there are docs in bd with this email. if there is no data, return this func from inside.
        if (isExistedEmail) {
            const result = yield order_service_1.OrderServices.getAllOrSpecificOrdersFromDB(email);
            if (result.length == 0) {
                res.status(500).json({
                    success: false,
                    message: 'Order not found',
                });
            }
        }
        // all orders which are found by the email inside db.
        if (isExistedEmail) {
            const result = yield order_service_1.OrderServices.getAllOrSpecificOrdersFromDB(email);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        // all orders from db
        else if (isExistedEmail == false) {
            const result = yield order_service_1.OrderServices.getAllOrSpecificOrdersFromDB(false);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
exports.OrderController = {
    insertOrderData,
    getAllOrSpecificOrders,
};
