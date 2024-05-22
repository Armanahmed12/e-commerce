import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllOrSpecificProducts);
router.get('/:productId', ProductController.getASpecificProductById);

router.put('/:productId', ProductController.findAndUpdateProduct);
router.delete('/:productId', ProductController.deleteOneSpecificDoc);

export const ProductRoutes = router;
