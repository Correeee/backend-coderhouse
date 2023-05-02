import { Router } from "express";

const router = Router()

router.get('/', (req, res)=>{
    res.send('HOME')
})

router.get('/products', (req, res)=>{
    res.json(products)
})

router.get('/filterproducts', (req, res)=>{
    const {limit} = req.query;
    
    const productsLimit = products.slice(0, limit)

    if(productsLimit.length != 0){
        res.json(productsLimit)
    }else{
        res.json(products)
    }
})

router.get('/products/:pid', (req, res)=>{
    const {pid} = req.params;

    const productFilter = products.find(prod => prod.id == parseInt(pid))

    if(productFilter){
        res.json(productFilter)
    }else{
        res.send('El ID de producto es inexistente.')
    }
})


export default router;