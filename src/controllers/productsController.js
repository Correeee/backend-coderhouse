import ProductsManagerMongoose from "../daos/mongoose/ProductManagerMongoose.js";

const productManager = new ProductsManagerMongoose()

export const getAllController = async (req, res, next) => {
    try {
        const docs = await productManager.getAllProducts()
        res.json(docs)
    } catch (error) {
        next(error)
    }
}

export const getProductsByIdController = async (req, res, next) => {
    try {
        const { id } = req.params
        const docs = await productManager.getProductById(id)
        if (!docs) {
            throw new Error('El producto NO existe.')
        } else {
            res.json(docs)
        }
    } catch (error) {
        next(error)
    }
}

export const createProductController = async (req, res, next) => {
    try {
        const { title, description, category, code, price, thumbnail, stock } = req.body;
        const newProduct = await productManager.createProduct({
            title,
            description,
            category, code,
            price,
            thumbnail,
            stock
        });

        if (!newProduct) {
            throw new Error('No se pudo crear el producto.')
        } else {
            res.json('Producto creado:', newProduct)
        }
    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, category, code, price, thumbnail, stock } = req.body;
        const updateProduct = await productManager.updateProduct(id, {
            title,
            description,
            category, code,
            price,
            thumbnail,
            stock
        });

        if (!updateProduct) {
            throw new Error('No se pudo actalizar el producto.')
        } else {
            res.json('Producto actualizado:', updateProduct)
        }

    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async () => {
    try {
        const { id } = req.params
        
        const deleteProduct = await productManager.deleteProduct(id)
        if(!deleteProduct){
            throw new Error ('No se pudo borrar el producto');
        }else{
            console.log('¡Producto borrado!')
            res.json(deleteProduct)
        }
    } catch (error) {
        next(error)
    }
}

