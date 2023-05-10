import { Router, json } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../manager/ProductManager.js";
const productManager = new ProductManager(__dirname + '/manager/ProductManager.json');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render('home', {products})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/realtime', (req, res) => {
    res.render('realtime')
})

export default router;