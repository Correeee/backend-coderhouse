import { Router } from "express";
import { addToCartController, createCartController, getAllCartsController, getCartByIdController } from "../controllers/cartController.js";

const routerCartMongoose = Router()

routerCartMongoose.get('/', getAllCartsController) //OK
routerCartMongoose.get('/:id', getCartByIdController) //OK
routerCartMongoose.post('/', createCartController) //OK
routerCartMongoose.put('/:id', addToCartController) //OK



export default routerCartMongoose;