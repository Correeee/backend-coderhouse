import mongoose from "mongoose";

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: false},
    stock: {type: Number, required: true}
},
{
    timestamps: true
})

export const productsModel = mongoose.model(productsCollection, productsSchema)