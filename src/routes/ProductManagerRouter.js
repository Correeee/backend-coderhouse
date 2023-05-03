import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";

const router = Router()

const productManager = new ProductManager()

router.get('/', async (req, res) => { //OBTIENE TODOS LOS PRODUCTOS. INCLUYE LIMIT QUERY. OK.
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()
        const productLimit = products.slice(0, Number(limit))
        if (productLimit.length > 0) {
            res.status(200).json(productLimit)
        } else {
            res.status(200).json(products)
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


router.get('/:pid', async (req, res) => {  //OBTIENE PRODUCTO POR ID. OK.
    try {
        const { pid } = req.params;
        const productFilterID = await productManager.getProductById(Number(pid))

        if (productFilterID) {
            res.status(200).json(productFilterID)
        } else {
            res.status(400).send('Product ID not found.')
        }
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

router.post('/', async (req, res) => { //AGREGA UN NUEVO PRODUCTO.
    try {
        const product = req.body
        const newProduct = await productManager.addProduct(product)
        res.json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => { //ACTUALIZA PRODUCTO. OK.
    try {
        const product = req.body;
        const { id } = req.params;
        const productFile = await productManager.getProductById(Number(id));
        if (productFile) {
            await productManager.updateProduct(product, Number(id));
            res.send(`Product updated.`);
        } else {
            res.status(404).send('Product not found.')
        }
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
})

router.delete('/:pid', async (req, res) => { //BORRA POR ID. OK.
    try {
        const { pid } = req.params;
        const products = await productManager.getProducts();
        if (products.length > 0) {
            await productManager.deleteProduct(Number(pid))
            res.status(200).send(`Product ${pid} deleted.`)
        } else {
            res.status(400).send(`Product ${pid} not founded. Impossible delete.`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


export default router;