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
                    ...prod.product,
                    quantity: prod.quantity
                }
            })


            const InStock = await Promise.all(productsID.map(async (prodCart) => {
                return await productManager.getProductById(prodCart._id);
            }));


            const conStock = productsID.map((prod, i) => { //PRODUCTOS DE CANTIDAD MENOR A STOCK.
                if (prod._id, InStock[i]._id) {
                    if (prod.quantity <= InStock[i].stock) {
                        return {
                            ...prod,
                            price: InStock[i].price
                        }
                    }
                }
            }).filter(prod => prod != undefined)


            const sinStock = productsID.map((prod, i) => { //PRODUCTOS CON STOCK MENOR A LA CANTIDAD.
                if (prod._id, InStock[i]._id) {
                    if (prod.quantity > InStock[i].stock) {
                        return {
                            quantity: prod.quantity,
                            product:{
                                _id: prod._id,
                                title: prod.title,
                                description: prod.description,
                                category: prod.category,
                                code: prod.code,
                                price: prod.price,
                                thumbnail: prod.thumbnail,
                                stock: prod.stock,
                                createdAt: prod.createdAt,
                                updatedAt: prod.updatedAt,
                                __v: prod.__v
                            }
                        }
                    }
                }
            }).filter(prod => prod != undefined)

            const prices = conStock.map(prod => prod.quantity * prod.price) // CANTIDAD X PRECIO
            const amountCart = prices.reduce((a, b) => a + b, 0) // PRECIO FINAL DE COMPRA


            if (conStock.length) {

                conStock.map(async (prod) => {
                    const product = await productManager.getProductById(prod._id)
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
                    await productManager.updateProduct(prod._id, newProduct)

                })

                const response = await ticketManager.createTicket({
                    code: await ticketManager.createCode(),
                    purchaseDatatime: new Date().toLocaleString(),
                    amount: amountCart,
                    purchaser: 'Fulanito'
                })

                if (sinStock.length) {
                    
                    await cartManager.updateCartProductsByArray(cid, sinStock)

                    res.json({
                        ProductosSinStock: sinStock
                    })
                } else {
                    res.json({
                        Ticket: response
                    })
                }

            } else {
                res.json({
                    ProductosSinStock: sinStock
                })
            }

        } else {
            res.send('El carrito no existe y/o está vacío.')
        }
    } catch (error) {
        next(error)
    }
}