"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
exports.OrderModel = (0, mongoose_1.model)('Order', orderSchema);
