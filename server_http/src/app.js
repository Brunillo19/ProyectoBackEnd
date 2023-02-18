const express = require('express');
const routerProducts = require ('/routes/products.router')
const routerCarts = require ('/routes/carts.router')
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);


app.listen(PORT, () => console.log(`Funcionando en PORT ${PORT} `));