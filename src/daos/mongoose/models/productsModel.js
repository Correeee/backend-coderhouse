import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    stock: { type: Number, required: true }
},
    {
        timestamps: true
    })

    productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema)