import { Router } from "express";
import { addToCartController, createCartController, emptyCartcontroller, getAllCartsController, getCartByIdController } from "../controllers/cartController.js";

const routerCartMongoose = Router()

routerCartMongoose.get('/', getAllCartsController) //LIST TODOS LOS CARRITOS - OK
routerCartMongoose.get('/:id', getCartByIdController) //OBTIENE UN CARRITO POR ID - OK
routerCartMongoose.post('/', createCartController) //CREA UN CARRITO - OK
routerCartMongoose.put('/:cid/:pid', addToCartController) //AGREGA UN PRODUCTO - OK
routerCartMongoose.delete('/:cid', emptyCartcontroller) //VACIA EL CARRITO - OK


export default routerCartMongoose;