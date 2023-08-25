import ProductsManagerMongoose from "../daos/mongoose/productDao.js";
import { checkAuth } from "../jwt/auth.js";
import { logger } from "../utils/logger.js";


const productManager = new ProductsManagerMongoose()

export const getAllController = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const response = await productManager.getAllProducts(page, limit)
        const nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        logger.info('¡Productos obtenidos!')
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
            logger.error('El producto NO existe.')
            throw new Error('El producto NO existe.')
        } else {
            logger.info('¡Producto obtenido por ID!')
            res.json(docs)
        }
    } catch (error) {
        next(error)
    }
}

export const createProductController = async (req, res, next) => {
    try {
        if (req.user.role == 'admin' || req.user.premium == true) {
            const { title, description, category, code, price, thumbnail, stock, owner } = req.body;

            const newProduct = await productManager.createProduct({
                title,
                description,
                category,
                code,
                price,
                thumbnail,
                stock,
                owner: req.user.email ? req.user.email : 'admin'
            });

            res.json(newProduct)
        } else {
            res.send(`Tu Role o tu Owner no te permite actualizar ni eliminar productos.`)
        }

    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {

        const { id } = req.params
        const { title, description, category, code, price, thumbnail, stock } = req.body;
        await checkAuth(req)

        if (req.user.role == 'admin') {
            const docs = await productManager.getProductById(id)

            if (!docs) {
                logger.error('El producto NO existe y, por lo tanto, NO puede ser actualizado.')
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
                logger.error('No se pudo actualizar el producto.')
                throw new Error('No se pudo actualizar el producto.')
            } else {
                const finalProduct = await productManager.getProductById(id)
                logger.info('¡Producto actualizado!')
                res.json(finalProduct)
            }
        } else {
            res.send(`Tu rol es ${req.user.role.toUpperCase()}, por lo tanto no puedes crear, actualizar ni eliminar productos.`)
        }

    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params
        await checkAuth(req)

        if (req.user.role == 'admin') {
            const productFounded = await productManager.getProductById(id)

            if (!productFounded) {
                logger.error('Producto NO encontrado.')
                throw new Error('Producto NO encontrado.')
            }

            const deleteProduct = await productManager.deleteProduct(id)

            if (!deleteProduct) {
                throw new Error('No se pudo borrar el producto');
            } else {
                logger.info('¡Producto borrado!')
                res.send(`¡Producto borrado: ${id}!`)
            }
        } else {
            if (req.user.premium == true) {
                const productFounded = await productManager.getProductById(id)

                if (!productFounded) {
                    logger.error('Producto NO encontrado.')
                    throw new Error('Producto NO encontrado.')
                }

                if (productFounded.owner == req.user.email) {

                    const deleteProduct = await productManager.deleteProduct(id)

                    if (!deleteProduct) {
                        throw new Error('No se pudo borrar el producto');
                    } else {
                        logger.info('¡Producto borrado!')
                        res.send(`¡Producto borrado: ${id}!`)
                    }
                } else {
                    res.send('No eres Admin ni has creado el producto, por lo tanto no puedes borrarlo.')
                }

            } else {
                res.send(`No eres Premium, por lo tanto no puedes actualizar ni eliminar productos.`)
            }
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
            logger.error('La categoría no existe.')
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
                logger.error('No existen productos de ese precio.')
                throw new Error('No existen productos de ese precio.')
            } else {
                res.json(priceFilter)
            }
        }

        if (!maxPrice) {
            const priceFilter = await productManager.priceFilter(minPrice, 9999999999)
            if (!priceFilter) {
                logger.error('No existen productos de ese precio.')
                throw new Error('No existen productos de ese precio.')
            } else {
                res.json(priceFilter)
            }
        }
        if (minPrice && maxPrice) {
            const priceFilter = await productManager.priceFilter(minPrice, maxPrice)
            if (!priceFilter) {
                logger.error('No existen productos de ese precio.')
                throw new Error('No existen productos de ese precio.')
            } else {
                res.json(priceFilter)
            }
        }



    } catch (error) {
        next(error)
    }

}