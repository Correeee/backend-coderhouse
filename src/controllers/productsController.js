import ProductsManagerMongoose from "../daos/mongoose/productDao.js";

const productManager = new ProductsManagerMongoose()

export const getAllController = async (req, res, next) => {
    try {
        const docs = await productManager.getAllProducts()
        console.log('¡Productos obtenidos!')
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
            console.log('¡Producto obtenido por ID!')
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
            console.log('¡Producto creado!')
            res.json(newProduct)
        }
    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, category, code, price, thumbnail, stock } = req.body;

        const docs = await productManager.getProductById(id)

        if(!docs){
            throw new Error ('El producto NO existe y, por lo tanto, NO puede ser actualizado.')
        }

        const updateProduct = await productManager.updateProduct(id, {
            title,
            description,
            category, 
            code,
            price,
            thumbnail,
            stock
        });

        if (!updateProduct) {
            throw new Error('No se pudo actualizar el producto.')
        } else {
            const finalProduct = await productManager.getProductById(id)
            console.log('¡Producto actualizado!')
            res.json(finalProduct)
        }

    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        
        const productFounded = await productManager.getProductById(id)

        if(!productFounded){
            throw new Error ('Producto NO encontrado.')
        }

        const deleteProduct = await productManager.deleteProduct(id)


        if (!deleteProduct) {
            throw new Error('No se pudo borrar el producto');
        } else {
            console.log('¡Producto borrado!')
            res.json(deleteProduct)
        }
    } catch (error) {
        next(error)
    }
}

