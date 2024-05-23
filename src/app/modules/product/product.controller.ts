import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { ProductServices } from './product.service';

// insert one document into db
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // validating data with Zod
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// get all products from database Or find doc with query string
const getAllOrSpecificProducts = async (req: Request, res: Response) => {
  try {
    const hasQueryParam = Object.values(req.query);

    // this "if" condition will check in db to know if there are docs in bd with this SearchTeam. if there is no data, return this func from inside.
    if (hasQueryParam.length > 0) {
      const result = await ProductServices.getAllOrSpecificProductsFromDB(
        hasQueryParam[0] as string,
      );

      if (result.length == 0) {
        res.status(500).json({
          success: false,
          message: 'Product not found',
        });
      }
    }
    // data fetching from db based on SearchTeam query param
    if (hasQueryParam.length > 0) {
      const result = await ProductServices.getAllOrSpecificProductsFromDB(
        hasQueryParam[0] as string,
      );
      res.status(200).json({
        success: true,
        message: "Products matching search term 'iphone' fetched successfully!",
        data: result,
      });
    }
    // if there is no query
    if (hasQueryParam.length == 0) {
      const result =
        await ProductServices.getAllOrSpecificProductsFromDB(false);

      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    // when makes an error
    res.status(500).json({
      success: false,
      message: 'Products not found',
    });
  }
};

// get a document by id
const getASpecificProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await ProductServices.getSpecificProductFromDB(productId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (err) {
    // if there is any error
    res.status(500).json({
      success: false,
      message: 'Product not found',
    });
  }
};

// find out a product and update
const findAndUpdateProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const updatedData = req.body;
  // validating data with Zod
  const zodParsedData = productValidationSchema.parse(updatedData);

  try {
    await ProductServices.findProductAndUpdateUsingDB(productId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: zodParsedData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product not found',
    });
  }
};
// Delete a Specific document by Id from DB
const deleteOneSpecificDoc = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await ProductServices.deleteOneProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product not found',
    });
  }
};

export const ProductController = {
  createProduct,
  getAllOrSpecificProducts,
  getASpecificProductById,
  findAndUpdateProduct,
  deleteOneSpecificDoc,
};
