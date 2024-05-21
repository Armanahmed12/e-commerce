import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// here we will call the controller function
// router.post('/create-student', StudentController.createStudent);

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllOrSpecificProducts);
router.get('/:productId', ProductController.getASpecificProductById);

router.put('/:productId', ProductController.findAndUpdateProduct);
router.delete('/:productId', ProductController.deleteOneSpecificDoc);

// router.get('/');

// router.get('/:studentId');

export const ProductRoutes = router;
