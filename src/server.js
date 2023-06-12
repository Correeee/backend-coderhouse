import express from "express";
// import routerProducts from "./routes/ProductManagerRouter.js";
// import routerCart from "./routes/CartRouter.js";
import morgan from "morgan";
import routerViews from "./routes/viewsRouter.js";
import Handlebars from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
// import ProductManager from "./manager/ProductManager.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import routerProductsMongoose from "./routes/productRouterMongoose.js";
import routerCartMongoose from "./routes/cartRouterMongoose.js";
import './db/db.js'
import messageRouter from "./routes/messageRouterMongoose.js";
import ProductsManagerMongoose from "./daos/mongoose/productDao.js";
import routerUsersMongoose from "./routes/usersRouterMongoose.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import UserManagerMongoose from "./daos/mongoose/userDao.js";

const storeOptions = {
    store: new MongoStore({
        mongoUrl: "mongodb+srv://Admin:admin123@backendcoderhouse.nugwvm4.mongodb.net/ecommerce?retryWrites=true&w=majority",
        // crypto: {
        //     secret: '1234'
        // },
        //autoRemoveInterval: 15,
        ttl: 10,
    }),
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}

/* --------------------------------- EXPRESS -------------------------------- */
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(errorHandler)
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(session(storeOptions))

/* ------------------------------- HANDLEBARS ------------------------------- */

app.engine('handlebars', Handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

/* ---------------------------------- STYLE --------------------------------- */

app.get('/style.css', function (req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/style.css');
});

/* --------------------------------- ROUTES --------------------------------- */

app.use('/products', routerProductsMongoose);
app.use('/carts', routerCartMongoose);
app.use('/', routerViews)
app.use('/messages', messageRouter)
app.use('/users', routerUsersMongoose)

/* --------------------------------- LISTEN --------------------------------- */
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})


/* --------------------------------- SOCKET --------------------------------- */

const socketServer = new Server(httpServer)

const productsManagerMongoose = new ProductsManagerMongoose()

const userManagerMongoose = new UserManagerMongoose()

socketServer.on('connection', async (socket) => {
    console.log('Usuario conectado:', socket.id)

    socket.emit('arrayProducts', await productsManagerMongoose.getAllProducts())

    socket.on('newProduct', async (lastProduct) => { //Agrega productos a la DB.
        await productsManagerMongoose.createProduct(lastProduct)
        socketServer.emit('arrayNewProduct', (lastProduct))
    })

})
