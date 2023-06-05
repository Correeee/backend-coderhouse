import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: { type: Array , default: []}
},
    {
        timestamps: true
    })

export const cartModel = mongoose.model(cartCollection, cartSchema)