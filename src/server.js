import express from "express";
import routerProducts from "./routes/ProductManagerRouter.js";
import routerCart from "./routes/CartRouter.js";
import morgan from "morgan";
import routerViews from "./routes/viewsRouter.js";
import Handlebars from "express-handlebars";
import { __dirname } from "./path.js";
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


/* ------------------------------- HANDLEBARS ------------------------------- */
app.engine('handlebars', Handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/style.css', function (req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/style.css');
});

/* --------------------------------- ROUTES --------------------------------- */

app.use('/products', routerProducts);
app.use('/cart', routerCart);
app.use('/', routerViews)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})
