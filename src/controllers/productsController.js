import ProductsManagerMongoose from "../daos/mongoose/productDao.js";

const productManager = new ProductsManagerMongoose()

export const getAllController = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const response = await productManager.getAllProducts(page, limit)
        const nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        console.log('¡Productos obtenidos!')
        res.json({
            results: response.docs,
            information: {
                totalProducts: response.totalDocs,
                totalPages: response.totalPages,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                nextLink,
                prevLink,
            }
        })
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
            category,
            code,
            price,
            thumbnail,
            stock
        });

        res.json(newProduct)

    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, category, code, price, thumbnail, stock } = req.body;

        const docs = await productManager.getProductById(id)

        if (!docs) {
            throw new Error('El producto NO existe y, por lo tanto, NO puede ser actualizado.')
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

        if (!productFounded) {
            throw new Error('Producto NO encontrado.')
        }

        const deleteProduct = await productManager.deleteProduct(id)

        if (!deleteProduct) {
            throw new Error('No se pudo borrar el producto');
        } else {
            console.log('¡Producto borrado!')
            res.send(`¡Producto borrado: ${id}!`)
        }
    } catch (error) {
        next(error)
    }
}

export const categoryFilterController = async (req, res, next) => { //Agreggation por categoria.
    try {
        const { category } = req.query

        const categoryFilter = await productManager.categoryFilter(category)

        if (!categoryFilter) {
            throw new Error('La categoría no existe')
        } else {
            res.json(categoryFilter)
        }
    } catch (error) {
        next(error)
    }

}

export const priceFilterController = async (req, res, next) => { // Filtro por: Precio Mínimo y Máximo.
    try {
        const { minPrice, maxPrice } = req.query

        if (!minPrice) {
            const priceFilter = await productManager.priceFilter(0, maxPrice)
            if (!priceFilter) {
                throw new Error('No existen productos de ese precio.')
            } else {
                res.json(priceFilter)
            }
        }

        if (!maxPrice) {
            const priceFilter = await productManager.priceFilter(minPrice, 9999999999)
            if (!priceFilter) {
                throw new Error('No existen productos de ese precio.')
            } else {
                res.json(priceFilter)
            }
        }
        if (minPrice && maxPrice) {
            const priceFilter = await productManager.priceFilter(minPrice, maxPrice)
            if (!priceFilter) {
                throw new Error('No existen productos de ese precio.')
            } else {
                res.json(priceFilter)
            }
        }



    } catch (error) {
        next(error)
    }

}