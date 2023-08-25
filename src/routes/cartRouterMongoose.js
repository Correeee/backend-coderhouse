import { Router } from "express";
import { addToCartController, changeQuantityController, createCartController, deleteProductInCartController, emptyCartcontroller, finalizePurchaseController, getAllCartsController, getCartByIdController, updateCartProductsByArrayController } from "../controllers/cartController.js";

const routerCartMongoose = Router()

routerCartMongoose.get('/', getAllCartsController) //LIST TODOS LOS CARRITOS - OK
routerCartMongoose.get('/:cid', getCartByIdController) //OBTIENE UN CARRITO POR ID - OK
routerCartMongoose.post('/', createCartController) //CREA UN CARRITO - OK
routerCartMongoose.put('/:cid/:pid', addToCartController) //AGREGA UN PRODUCTO - OK
routerCartMongoose.delete('/:cid', emptyCartcontroller) //VACIA EL CARRITO - OK
routerCartMongoose.delete('/:cid/products/:pid', deleteProductInCartController) //BORRAR 1 PRODUCTO ESPECIFICO EN EL CARRITO - OK
routerCartMongoose.put('/:cid/products/:pid', changeQuantityController) // CAMBIAR CANTIDAD DE 1 PRODUCTO POR ID y QUANTITY POR REQ.BODY - OK
// routerCartMongoose.put('/:cid', updateCartProductsByArrayController) //ACTUALIZAR PRODUCTS CON UN ARRAY - OK


routerCartMongoose.post('/:cid/purchase',  finalizePurchaseController) //FINALIZAR COMPRA 



export default routerCartMongoose;