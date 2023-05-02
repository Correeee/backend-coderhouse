import express from "express";
import ProductManager from "./manager/ProductManager.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager('src/manager/ProductManager.json')

app.get('/', (req, res) => {
    res.status(200).send('HOME')
})

app.get('/products', async (req, res) => { //OBTIENE TODOS LOS PRODUCTOS. INCLUYE LIMIT QUERY. OK.
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


app.get('/products/:pid', async (req, res) => {  //OBTIENE PRODUCTO POR ID. OK.
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

app.post('/products', async (req, res) => { //AGREGA UN NUEVO PRODUCTO.
    try {
        const product = req.body
        const newProduct = await productManager.addProduct(product)
        res.json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.put('/products/:id', async (req, res) => { //ACTUALIZA PRODUCTO. OK.
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

app.delete('/products/:pid', async (req, res) => { //BORRA POR ID. OK.
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

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})
