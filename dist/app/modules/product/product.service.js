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
exports.ProductServices = void 0;
const mongodb_1 = require("mongodb");
const product_model_1 = require("./product.model");
// create a new Pd to database
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
// get all Or specific Products from DB
const getAllOrSpecificProductsFromDB = (hasQueryParam) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof hasQueryParam == 'string') {
        const regex = new RegExp(hasQueryParam, 'i');
        const docs = yield product_model_1.ProductModel.find({
            $or: [{ name: regex }, { description: regex }, { category: regex }],
        });
        return docs;
    }
    else {
        return yield product_model_1.ProductModel.find();
    }
});
// find out a specific Product by Id
const getSpecificProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: new mongodb_1.ObjectId(productId) });
    return result;
});
// Find product by Id and update
const findProductAndUpdateUsingDB = (productId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.updateOne({ _id: new mongodb_1.ObjectId(productId) }, updatedData);
    return result;
});
//  Delete a product with Id from MongoDB
const deleteOneProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ _id: new mongodb_1.ObjectId(productId) });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllOrSpecificProductsFromDB,
    getSpecificProductFromDB,
    findProductAndUpdateUsingDB,
    deleteOneProductFromDB,
};
