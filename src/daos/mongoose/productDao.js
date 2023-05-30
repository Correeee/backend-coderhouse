import { productsModel } from './models/productsModel.js'

export default class ProductsManagerMongoose {
    async getAllProducts() {
        try {
            const response = await productsModel.find({})
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const response = await productsModel.findById(id)
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async createProduct(obj) {
        try {
            const response = await productsModel.create(obj);
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            const response = await productsModel.findOneAndDelete(id)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, obj) {
        try {
            const response = await productsModel.updateOne({_id: id}, obj)
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}