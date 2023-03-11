
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const path = require('path');
const routerProducts = require('./routes/products.router');
const routerCarts = require('./routes/carts.router');
const routerMessages = require('./routes/chat.router');
const { Server } = require('socket.io');


const productModel = require('./dao/models/product.model');
require('dotenv').config();


DB_HOST = "localhost"
DB_PORT =27017;
DB_NAME = "Products"
const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Funcionando en PORT ${PORT} `));
const socketServer = new Server(httpServer);
const nuevoProducto = new ProductManager('src/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', handlebars.engine());

app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/messages', routerMessages);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts.handlebars'));


socketServer.on("connection", async socket => {

    console.log('Nuevo cliente conectado');

	const products = await nuevoProducto.getProducts();
	socket.emit('products', products);
    
	socket.on('addProd', async prod => await nuevoProducto.addProduct(prod));
    
	socket.on('delProd', async id => await nuevoProducto.deleteProduct(id));
});

mongoose.connect(
	`mongodb+srv://${DB_HOST}:${DB_PORT}/${DB_NAME}`
);