import express from "express";
import routerProducts from "./routes/ProductManagerRouter.js";
import routerCart from "./routes/CartRouter.js";
import morgan from "morgan";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/products', routerProducts);
app.use('/cart', routerCart);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})
