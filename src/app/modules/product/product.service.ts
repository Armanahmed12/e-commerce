import { ObjectId } from 'mongodb';
import { ProductModel } from "../product.model";
import { Product } from "./product.interface";

const createProductIntoDB = async (productData: Product) => {

  const result = await ProductModel.create(productData);
//   const student = new Student(studentData);
//   const result = await student.save(); // built in mongoose method
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// find out a specific Product by Id
const getSpecificProductFromDB = async (productId : string) => {
  const result = await ProductModel.findOne({ _id : new ObjectId(productId) });
  return result;
};


// Find product by Id and update
const findProductAndUpdateUsingDB = async ( productId : string, updatedData : object) => {
    
    const result = await ProductModel.updateOne({ _id : new ObjectId(productId) }, updatedData);
    return result;
  };


//  Delete a product with Id from MongoDB
const deleteOneProductFromDB = async( productId : string) =>{

       const result = await ProductModel.deleteOne({ _id : new ObjectId(productId) });
       return result;
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSpecificProductFromDB,
  findProductAndUpdateUsingDB,
  deleteOneProductFromDB,
 
};
