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


export const deleteProductInCartController = async (req, res, next) => { //Borra un producto, y toda su cantidad, por ID.
    try {
        const { cid, pid } = req.params
        const cartAndProduct = await cartManager.deleteProductInCart(cid, pid)

        if (!cartAndProduct) {
            throw new Error('El Producto y/o el Carrito son inexistentes.')
        } else {
            res.send(`¡Producto: ${pid} eliminado del Carrito: ${cid}!`)
        }
    } catch (error) {
        next(error)
    }
}

export const updateCartProductsByArrayController = async (req, res, next) => {
    {
        try {
            const { cid } = req.params
            const newArray = req.body
            const updatedCart = await cartManager.updateCartProductsByArray(cid, newArray)

            if (!updatedCart) {
                throw new Error(`El Carrito ${cid} no pudo ser actualizado.`)
            } else {
                res.send(`¡Carrito: ${cid} actualizado!`)
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const changeQuantityController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        const updatedCartProduct = await cartManager.changeQuantity(cid, pid, Number(quantity))

        if(!updatedCartProduct){
            throw new Error (`No se pudo actualizar la cantidad de: ${quantity} en el Producto: ${pid} del Carrito: ${cid}.`)
        }else{
            res.send(`Producto: ${pid} del Carrito: ${cid} actualizado en la Cantidad de: ${quantity}.`)
        }
    } catch (error) {
        next(error)
    }
}