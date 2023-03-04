const express = require('express');
const handlebars  = require('express-handlebars')
const routerProducts = require ('/routes/products.router')
const routerCarts = require ('/routes/carts.router')
const path = reuqire('path')
const {Server}=require('socket.io')
const ProductManager = require('./ProductManager')
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Funcionando en PORT ${PORT} `));
const socketServer = new Server(httpServer);
const nuevoProducto = new ProductManager('src/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars',handlebars.engine());
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.get('/realtimeproducts', async(req,res)=>res.status(200).render('realTimeProducts'));

socketServer.on('connection',async socket =>{

console.log('Se ha conectado un nuevo cliente');
const products = await nuevoProducto.getProducts();
socket.emit('products',products);
socket.on('addProd',async product =>await nuevoProducto.addProduct(product));
socket.on('delProd',async id => await nuevoProducto.deleteProduct(id));
});

