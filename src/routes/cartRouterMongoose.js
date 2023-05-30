import { Router } from "express";
import { addToCartController, deleteCartProductController, getAllCartsController, getCartByIdController } from "../controllers/cartController.js";

const routerCartMongoose = Router()

routerCartMongoose.get('/', getAllCartsController) //OK
routerCartMongoose.get('/:id', getCartByIdController) //OK
routerCartMongoose.put('/:id', addToCartController) //
routerCartMongoose.delete('/:id', deleteCartProductController) //

export default routerCartMongoose;