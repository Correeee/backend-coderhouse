import CartManagerMongoose from "../daos/mongoose/cartDao.js";

const cartManager = new CartManagerMongoose()

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
        const { id } = req.params
        const { title, description, category, code, price, thumbnail, stock } = req.body
        const docs = await cartManager.addToCart(id, {title, description, category, code, price, thumbnail, stock })
        if (!docs) {
            throw new Error('No existe este carrito.')
        } else {
            res.json(docs)
        }
    } catch (error) {
        next(error)
    }
}

export const deleteCartProductController = async (req, res, next) => {
    try {
        const { id } = req.params

    } catch (error) {
        next(error)
    }
}
