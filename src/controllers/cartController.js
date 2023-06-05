import CartManagerMongoose from "../daos/mongoose/cartDao.js";
import ProductsManagerMongoose from '../daos/mongoose/productDao.js'

const cartManager = new CartManagerMongoose()
const productManager = new ProductsManagerMongoose()

export const getAllCartsController = async (req, res, next) => {
    try {
        const docs = await cartManager.getAllCarts()
        res.json(docs)
    } catch (error) {
        next(error)
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { id } = req.params
        const docs = await cartManager.getCartById(id)
        if (!docs) {
            throw new Error('No existe este carrito.')
        } else {
            res.json(docs)
        }
    } catch (error) {
        next(error)
    }
}

export const addToCartController = async (req, res, next) => {
    try {
        const { cid } = req.params
        const { pid } = req.params

        const docs = await cartManager.addToCart(cid, pid)

        if (!docs) {
            throw new Error('No existe este carrito.')
        } else {
            res.json(docs)
        }

    } catch (error) {
        next(error)
    }
}

export const createCartController = async (req, res, next) => {
    try {

        const newCart = await cartManager.createCart({})

        if (!newCart) {
            throw new Error('No se pudo crear el carrito.')
        } else {
            res.json(newCart)
        }

    } catch (error) {
        next(error)
    }

}

export const emptyCartcontroller = async (req, res, next) => {
    try {
        const { cid } = req.params
        const emptyCart = await cartManager.emptyCart(cid)
        
        if (!emptyCart) {
            throw new Error(`No se pudo vaciar el carrito: ${cid}. `)
        } else {
            return res.send(`¡Carrito ${cid} vaciado!`)
        }
    } catch (error) {
        next(error)
    }
}


