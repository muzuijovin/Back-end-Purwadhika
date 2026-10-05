/* layer router yang fungsinya untuk mendefinisikan HTTP method dan route URL */
import { Router } from "express";
import { createProductController, deleteProductController, getProductController, updateProductController } from "../controllers/products-controllers";

export const productRouter = Router();

productRouter.post('/products', createProductController)
productRouter.get('/products', getProductController)
productRouter.put('/products/:product_id', updateProductController)

// soft deletd
productRouter.delete('/products/:product_id', deleteProductController)
