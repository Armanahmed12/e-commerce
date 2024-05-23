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
exports.ProductController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
// insert one document into db
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // validating data with Zod
        const zodParsedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
// get all products from database Or find doc with query string
const getAllOrSpecificProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasQueryParam = Object.values(req.query);
        console.log(hasQueryParam);
        // this "if" condition will check in db to know if there are docs in bd with this SearchTeam. if there is no data, return this func from inside.
        if (hasQueryParam.length > 0) {
            const result = yield product_service_1.ProductServices.getAllOrSpecificProductsFromDB(hasQueryParam[0]);
            if (result.length == 0) {
                res.status(500).json({
                    success: false,
                    message: 'Product not found',
                });
            }
        }
        // data fetching from db based on SearchTeam query param
        if (hasQueryParam.length > 0) {
            const result = yield product_service_1.ProductServices.getAllOrSpecificProductsFromDB(hasQueryParam[0]);
            res.status(200).json({
                success: true,
                message: "Products matching search term 'iphone' fetched successfully!",
                data: result,
            });
        }
        // if there is no query
        if (hasQueryParam.length == 0) {
            const result = yield product_service_1.ProductServices.getAllOrSpecificProductsFromDB(false);
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result,
            });
        }
    }
    catch (err) {
        // when makes an error
        res.status(500).json({
            success: false,
            message: 'Products not found',
        });
    }
});
// get a document by id
const getASpecificProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        console.log(productId);
        const result = yield product_service_1.ProductServices.getSpecificProductFromDB(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Order not found',
            });
        }
    }
    catch (err) {
        // if there is any error
        res.status(500).json({
            success: false,
            message: 'Product not found',
        });
    }
});
// find out a product and update
const findAndUpdateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const updatedData = req.body;
    // validating data with Zod
    const zodParsedData = product_validation_1.default.parse(updatedData);
    try {
        yield product_service_1.ProductServices.findProductAndUpdateUsingDB(productId, zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: zodParsedData,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Product not found',
        });
    }
});
// Delete a Specific document by Id from DB
const deleteOneSpecificDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield product_service_1.ProductServices.deleteOneProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Product not found',
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllOrSpecificProducts,
    getASpecificProductById,
    findAndUpdateProduct,
    deleteOneSpecificDoc,
};
