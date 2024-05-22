import { ObjectId } from 'mongodb';
import { ProductModel } from './product.model';
import { Product } from './product.interface';

const createProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllOrSpecificProductsFromDB = async (
  hasQueryParam: boolean | string,
) => {
  console.log(hasQueryParam, typeof hasQueryParam);
  if (typeof hasQueryParam == 'string') {
    const docs = await ProductModel.find({ description: /iPhone/i });
    console.log(docs, 'docs service');
    return docs;
  } else {
    return await ProductModel.find();
  }
};

// find out a specific Product by Id
const getSpecificProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: new ObjectId(productId) });
  return result;
};

// Find product by Id and update
const findProductAndUpdateUsingDB = async (
  productId: string,
  updatedData: object,
) => {
  const result = await ProductModel.updateOne(
    { _id: new ObjectId(productId) },
    updatedData,
  );
  return result;
};

//  Delete a product with Id from MongoDB
const deleteOneProductFromDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: new ObjectId(productId) });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllOrSpecificProductsFromDB,
  getSpecificProductFromDB,
  findProductAndUpdateUsingDB,
  deleteOneProductFromDB,
};
