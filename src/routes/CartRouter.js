import { Router } from "express";
import Cart from '../cart/Cart.js'
import ProductManager from "../manager/ProductManager.js";

const router = Router()

const cart = new Cart()

const productManager = new ProductManager()

router.get('/', async (req, res) => { //LISTA TODOS LOS CARRITOS. OK.
    try {
        const allCarts = await cart.getCarts()
        res.status(200).json(allCarts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/', async (req, res) => { //CREA CARRITO. OK.
    try {
        await cart.createCart()
        const carts = await cart.getCarts()
        const newCart = JSON.stringify(carts[carts.length - 1].id)
        res.status(200).send(`¡Cart created. ID: ${newCart}!`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/:cid', async (req, res) => { //LISTA PRODUCTOS. OK.
    try {
        const { cid } = req.params;
        const allCarts = await cart.getCarts()
        const cartFilter = allCarts.find(carts => carts.id == cid)
        if(cartFilter.products.length > 0){
            res.status(200).json(cartFilter.products)
        }else{
            res.status(400).send('There are no products.')
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/:cid/product/:pid', async (req, res) => { //AGREGAR PRODUCTO AL CARRITO
    try {
        const {cid, pid} = req.params;
        await cart.getCartById(cid)
        await productManager.getProductById(pid)
        await cart.addToCart(cid, pid)
        res.status(200).send(`Producto ID: ${pid} agregado el carrito ID: ${cid}.`)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


export default router;