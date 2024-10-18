import express from 'express';

import * as ProductController from '../app/controllers/ProductController.js';
import { authMiddleware } from '../app/middlewares/authMiddleware.js';
const productRouter = express.Router();

productRouter.put('/update/:id', authMiddleware, ProductController.updateProduct);
productRouter.post('/create', authMiddleware, ProductController.createProduct);
productRouter.delete('/delete/:id', authMiddleware, ProductController.deleteProduct);
productRouter.get('/detail/:slug', ProductController.getProductDetail);
productRouter.get('/', ProductController.getAllProduct);
export default productRouter;
