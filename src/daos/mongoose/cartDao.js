import { cartModel } from "../mongoose/models/cartModel.js";
import { productsModel } from "./models/productsModel.js";

export default class CartManagerMongoose {

    async getAllCarts() {
        try {
            const response = await cartModel.find({})
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async createCart(obj) {
        try {
            const response = await cartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            const response = await cartModel.findById(id)
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async addToCart(cid, pid) {
        try {
            const findCart = await cartModel.findById(cid);
            const allProducts = await productsModel.find();
            const findProduct = allProducts.find((prod) => prod.id === pid);

            if (!findProduct) {
                throw new Error(`¡The requested product id ${pid} does not exist!`);
            } else {
                if (findCart) {
                    const productExist = findCart.products.find((product) => product.product === pid);
                    if (!productExist) {
                        const newProd = {
                            quantity: 1,
                            product: pid,
                        };
                        findCart.products.push(newProd);
                        await cartModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
                        return findCart;
                    } else {
                        const indexProduct = findCart.products.findIndex(elemento => elemento.product === pid);
                        findCart.products[indexProduct].quantity += 1;
                        await cartModel.findByIdAndUpdate({ _id: cid }, { $set: findCart });
                        return findCart;
                    }
                } else {
                    throw new Error("The cart you are searching for does not exist!");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async emptyCart(id) {
        try {
            const foundedCart = await cartModel.findByIdAndUpdate(id, {products: []})
            console.log(foundedCart)
            return foundedCart
        } catch (error) {
            console.log(error)
        }
    }


}