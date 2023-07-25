import CartManagerMongoose from "../daos/mongoose/cartDao.js";
import ProductsManagerMongoose from '../daos/mongoose/productDao.js'
import TicketManagerMongoose from "../daos/mongoose/ticketDao.js";
import { getProductsByIdController } from "./productsController.js";

const cartManager = new CartManagerMongoose()
const productManager = new ProductsManagerMongoose()
const ticketManager = new TicketManagerMongoose()

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
        const { cid } = req.params
        const docs = await cartManager.getCartById(cid)
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

        if (!updatedCartProduct) {
            throw new Error(`No se pudo actualizar la cantidad de: ${quantity} en el Producto: ${pid} del Carrito: ${cid}.`)
        } else {
            res.send(`Producto: ${pid} del Carrito: ${cid} actualizado en la Cantidad de: ${quantity}.`)
        }
    } catch (error) {
        next(error)
    }
}

export const finalizePurchaseController = async (req, res, next) => {
    try {

        const { cid } = req.params
        const cart = await cartManager.getCartById(cid)

        if (cart.products.length) { //PRODUCTOS DEL CARRITO: ID Y CANTIDAD.
            const productsID = cart.products.map(prod => {
                return {
                    id: prod.product._id,
                    quantity: prod.quantity
                }
            })

            const InStock = await Promise.all(productsID.map(async (prodCart) => {
                return await productManager.getProductById(prodCart.id);
            }));

            const productsInStock = InStock.map(prod => { //PRODUCTOS DE STOCK: ID Y STOCK
                return {
                    id: prod._id,
                    stock: prod.stock
                }
            })


            const comprobarStock = productsID.map((prod, i) => {
                if (prod.id, productsInStock[i].id) {
                    if (prod.quantity <= productsInStock[i].stock) {
                        return true
                    } else {
                        false
                    }
                }
            })
            const StockOK = comprobarStock.every(state => state === true) //COMPRUEBA SI TODOS LOS PRODUCTOS TIENEN EL STOCK SUFICIENTE

            const prices = cart.products.map(prod => prod.quantity * prod.product.price) // CANTIDAD X PRECIO
            const amountCart = prices.reduce((a, b) => a + b, 0) // PRECIO FINAL DE COMPRA

            if (StockOK) {

                productsID.map(async (prod) => { 
                    const product = await productManager.getProductById(prod.id)
                    const { title, description, category, code, price, thumbnail, stock } = product
                    const newProduct = {
                        title, 
                        description, 
                        category, 
                        code, 
                        price, 
                        thumbnail, 
                        stock: stock - prod.quantity
                    }
                    await productManager.updateProduct(prod.id, newProduct)

                })

                const response = await ticketManager.createTicket({
                    code: await ticketManager.createCode(),
                    purchaseDatatime: new Date().toLocaleString(),
                    amount: amountCart,
                    purchaser: 'Fulanito'
                })

                res.json(response)

            } else {
                res.send('Stock insuficiente.')
                return
            }

        } else {
            res.send('El carrito no existe y/o está vacío.')
        }
    } catch (error) {
        next(error)
    }
}