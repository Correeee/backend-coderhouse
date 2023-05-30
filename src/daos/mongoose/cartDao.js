import { cartModel } from "../mongoose/models/cartModel.js";

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

    async addToCart(id, obj) {
        try {
            const cartFounded = await cartModel.findById(id)
            const products = [...cartFounded.products, obj]
            const cartUpdate = await cartModel.updateOne({ _id: id }, { $set: { products: products } })
            return cartUpdate
        } catch (error) {
            console.log(error)
        }
    }

}