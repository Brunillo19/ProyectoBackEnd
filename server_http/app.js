const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const NewProduct = new ProductManager ('./db/db.json')

app.get('/products', async (req, res) => {
	const NumberLimit = Number(req.query.limit);
	const products = await NewProduct.getProducts();
	if (NumberLimit) return res.status(200).json(products.slice(0, NumberLimit));
	res.status(200).json(products);
});

app.get('/products/:pId', async (req, res) => {
	const id = Number(req.params.pId);
	const product = await NewProduct.getProductsbyId(id);
	if (!product) return res.status(404).json({ message: 'El id ingresado es incorrecto o el producto no existe' });
	res.status(200).json(product);
});



app.listen(PORT, () => console.log(`Funcionando en PORT ${PORT} `));