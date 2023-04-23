import express from "express";
import {products} from './src/ProductManager.json'

const app = express();
const PORT = 8080

products.map(producto=> console.log(JSON(producto)))

app.get('/', (req, res) =>{
    res.send('Esto es la respuesta del Home.')
})

app.listen(PORT, ()=>{
    console.log(`Servidor en puerto ${8080}.`)
})

