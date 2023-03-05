
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const { Server } = require('socket.io');
const routerProducts = require ('./Routes/Product.router')
const routerCarts = require ('./Routes/Cart.router')

const ProductManager = require('./ProductManager')
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Funcionando en PORT ${PORT} `));
const socketServer = new Server(httpServer);
const nuevoProducto = new ProductManager('db/db.json');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));


socketServer.on('connection', async socket => {
    console.log('Nuevo cliente conectado');
    
	const products = await nuevoProducto.getProducts();
	socket.emit('products', products);
    
	socket.on('addProd', async prod => await nuevoProducto.addProduct(prod));
    
	socket.on('delProd', async id => await nuevoProducto.deleteProduct(id));
});

