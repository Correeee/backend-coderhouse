import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../manager/ProductManager.js";
const productManager = new ProductManager(__dirname + '/manager/ProductManager.json');

const router = Router();

// router.get('/', async (req, res) => {
//     try {
//         const products = await productManager.getProducts()
//         res.render('home', { products })
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

router.get('/', (req, res) =>{
    res.render('login')
})

router.get('/realtime', (req, res) => {
    res.render('realtime')
})

router.get('/register', (req, res) =>{
    res.render('register')
})

router.get('/login', (req, res) =>{
    res.render('login')
})

router.get('/profile', (req, res) =>{
    res.render('profile')
})

router.get('/errorRegister', (req, res) =>{
    res.render('errorRegister')
})

router.get('/errorLogin', (req, res) =>{
    res.render('errorLogin')
})

router.get('/profileGithub', (req, res) =>{
    res.render('profileGithub')
})



export default router;