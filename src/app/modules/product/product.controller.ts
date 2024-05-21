import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { ProductServices } from './product.service';

// insert one document into db
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    console.log(productData);
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

// get all products from database
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const isExistedSearchTerm = req.query.searchTerm;
    console.log(req.query.searchTerm);
    if (isExistedSearchTerm) {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        query: isExistedSearchTerm,
      });
    }
     else {
      console.log('after query false');
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// get a document by id
const getASpecificProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    console.log(productId);
    const result = await ProductServices.getSpecificProductFromDB(productId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// find out a product and update
const findAndUpdateProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const updatedData = req.body;

  try {
    const result = await ProductServices.findProductAndUpdateUsingDB(
      productId,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedData,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete a Specific document by Id from DB
const deleteOneSpecificDoc = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteOneProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};


export const ProductController = {
  createProduct,
  getAllProducts,
  getASpecificProductById,
  findAndUpdateProduct,
  deleteOneSpecificDoc,
};
