import { cartModel } from "../mongoose/models/cartModel.js";
import { productsModel } from "./models/productsModel.js";

export default class CartManagerMongoose {

    async getAllCarts() {
        try {
            const response = await cartModel.find({})
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createCart(obj) {
        try {
            const response = await cartModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getCartById(id) {
        try {
            const response = await cartModel.findById(id)
            return response.populate('products');
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async addToCart(cid, pid) {
        try {
            const findCart = await cartModel.findById(cid);
            console.log(findCart)
            const allProducts = await productsModel.find();
            const findProduct = allProducts.find((prod) => prod.id === pid);

            if (!findProduct) {
                throw new Error(`¡El Producto: ${pid} no existe!`);
            } else {
                if (findCart) {
                    const productExist = findCart.products.find((product) => product.product._id == pid);
                    if (!productExist) {
                        const newProd = {
                            quantity: 1,
                            product: findProduct,
                        };
                        findCart.products.push(newProd);
                        await cartModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
                        return findCart;
                    } else {
                        const indexProduct = findCart.products.findIndex((elemento) => elemento.product._id == pid);
                        findCart.products[indexProduct].quantity += 1;
                        await cartModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
                        return findCart;
                    }
                } else {
                    throw new Error("El carrito NO existe.");
                }
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductInCart(cid, pid) { //Borra un producto, y toda su cantidad, por ID.
        try {
            const cartFounded = await cartModel.findById(cid)
            const newProducts = cartFounded.products.filter(products => products.product != pid)
            const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: newProducts })
            return updatedCart
        } catch (error) {
            console.log(error)
        }
    }

    async changeQuantity(cid, pid, newQuantity) {
        try {
            const foundedCart = await cartModel.findById(cid)
            const foundedProduct = foundedCart.products.filter(products => products.product == pid)
            const restCart = foundedCart.products.filter(products => products.product != pid)
            const updateQuantityProduct = [{
                quantity: newQuantity,
                product: foundedProduct[0].product
            }]

            const arrayProducts = [
                ...restCart,
                ...updateQuantityProduct
            ]

            const updateCart = await cartModel.findByIdAndUpdate(cid, { products: arrayProducts })

            return updateCart

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateCartProductsByArray(cid, newArray) {
        try {
            const foundedCart = await cartModel.findByIdAndUpdate(cid, { products: newArray })
            return foundedCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async emptyCart(id) {
        try {
            const foundedCart = await cartModel.findByIdAndUpdate(id, { products: [] })
            console.log(foundedCart)
            return foundedCart
        } catch (error) {
            throw new Error(error.message)
        }
    }

}