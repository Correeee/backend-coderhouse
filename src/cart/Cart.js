import fs from 'fs';

const path = 'src/cart/Cart.json'
const pathProductManager = 'src/manager/ProductManager.json'

class Cart {
    #firstId = 0;
    constructor() {
        this.path = path
    }

    async #generateId() {

        const allCarts = await fs.promises.readFile(path, 'utf-8')
        const cartsJSON = JSON.parse(allCarts)

        if (cartsJSON.length > 0) {
            const cartIds = cartsJSON.map(cart => cart.id)
            const maxNumber = Math.max(...cartIds)
            console.log(cartIds , maxNumber)
            let id = maxNumber + 1
            return id
        } else {
            this.#firstId += 1
            let id = this.#firstId
            return id;
        }

    }

    async createCart() {
        try {
            if (fs.existsSync(path)) {

                const cart = await fs.promises.readFile(path, 'utf-8')

                if (cart.length == 0) {
                    await fs.promises.writeFile(path, JSON.stringify([]))
                }

                const newCart = {
                    id: await this.#generateId(),
                    products: []
                }

                if (cart.length == 0) {
                    await fs.promises.writeFile(path, JSON.stringify([newCart]))
                } else {
                    const cartJSON = JSON.parse(cart)
                    cartJSON.push(newCart)
                    await fs.promises.writeFile(path, JSON.stringify(cartJSON))
                }

            } else {
                return []
            }

        } catch (error) {
            return console.log(error)
        }
    }

    async getCarts() {
        try {
            const cartReader = await fs.promises.readFile(path, 'utf-8')
            const cartReaderJSON = JSON.parse(cartReader)
            return cartReaderJSON
        } catch (error) {
            return console.log(error)
        }
    }

    async getCartById(id) {
        try {
            const cartReader = await this.getCarts()
            const cartFilterId = cartReader.find(cart => cart.id == id)
            return console.log(cartFilterId.products)
        } catch (error) {
            return console.log(error)
        }
    }

    async getProducts() {
        const products = await fs.promises.readFile(pathProductManager, 'utf-8')
        const productsJSON = JSON.parse(products)
        return productsJSON
    }

    async addToCart(idCart, idProduct) {
        try {
            const cartReader = await this.getCarts() //TERMINAR
            const cartFilter = cartReader.find(carts => carts.id == idCart)
            if (cartFilter) {
                const products = await this.getProducts()
                if (products) {
                    const productFound = products.find(product => product.id == idProduct)
                    if (productFound) {
                        const restCarts = cartReader.filter(cart => cart.id != idCart)
                        cartFilter.products.push({ id: productFound.id, quantity: 1 })
                        restCarts.push(cartFilter)
                        await fs.promises.writeFile(path, JSON.stringify(restCarts))
                        return cartFilter
                    } else {
                        return console.log('Product not found.')
                    }
                } else {
                    return console.log('There are no products.')
                }
            } else {
                return console.log(`The cart ID: ${idCart} does not exist.`)
            }
        } catch (error) {
            return console.log(error)
        }
    }

}

const newCart = new Cart()

const test = async () => {
    try {

        await newCart.createCart()
        await newCart.createCart()
        await newCart.createCart()
        await newCart.createCart()
        await newCart.getCartById(1)
        await newCart.addToCart(1, 1)

    } catch (error) {
        return console.log(error)
    }
}

// test()

export default Cart;