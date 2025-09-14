import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/',getProducts);
productRouter.post('/',createProduct);
productRouter.delete('/:productID', deleteProduct);
productRouter.put('/:productID',updateProduct);
productRouter.get('/:productID',getProducts);



export default productRouter;
