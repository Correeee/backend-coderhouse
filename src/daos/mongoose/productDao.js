import { productsModel } from './models/productsModel.js'

export default class ProductsManagerMongoose {
    async getAllProducts(page = 1, limit = 10) {
        try {
            const response = await productsModel.paginate({}, {page, limit}) //PAGINACIÓN
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
            throw new Error(error)
        }
    }

    async createProduct(obj) {
        try {
            const response = await productsModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const response = await productsModel.findOneAndDelete(id)
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id, obj) {
        try {
            const response = await productsModel.updateOne({_id: id}, obj)
            return response;
        } catch (error) {
            throw new Error(error)
        }
    }

    async categoryFilter(category){ //Agreggation por categoria.
        try {
            const response = await productsModel.aggregate([
                {
                    $match: {category: `${category}`}
                }
            ])
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async priceFilter(minPrice, maxPrice){ // Filtro por: Precio Mínimo y Máximo. Orden de Menor a Mayor.
        try {
            const response =  await productsModel.aggregate([
                {
                    $match: {
                        price: {$gte: Number(minPrice), $lte: Number(maxPrice)}
                    }
                },
                {
                    $sort:{
                        price: 1
                    }
                }
            ])
            return response
        } catch (error) {
            throw new Error(error)
        }
    }
}