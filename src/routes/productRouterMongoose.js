import { Router } from "express";
import {
    categoryFilterController,
    createProductController,
    deleteProductController,
    getAllController,
    getProductsByIdController,
    priceFilterController,
    updateProductController
} from "../controllers/productsController.js";

const routerProductsMongoose = Router()

routerProductsMongoose.get('/', getAllController);

routerProductsMongoose.get('/:id', getProductsByIdController);

routerProductsMongoose.post('/', createProductController);

routerProductsMongoose.put('/:id', updateProductController);

routerProductsMongoose.delete('/:id', deleteProductController);

routerProductsMongoose.get('/filter/category', categoryFilterController) //Filtra por: Categoria.

routerProductsMongoose.get('/filter/prices', priceFilterController) //Filtra por: Precio Mínimo y Máximo.

export default routerProductsMongoose;