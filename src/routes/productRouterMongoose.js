import { Router } from "express";
import {
    createProductController,
    deleteProductController,
    getAllController,
    getProductsByIdController,
    updateProductController
} from "../controllers/productsController.js";

const routerProductsMongoose = Router()

routerProductsMongoose.get('/', getAllController);

routerProductsMongoose.get('/:id', getProductsByIdController);

routerProductsMongoose.post('/', createProductController);

routerProductsMongoose.put('/:id', updateProductController);

routerProductsMongoose.delete('/:id', deleteProductController);

export default routerProductsMongoose;