const fs = require('fs');
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('src/db/products.json');

class CartManager {
	constructor(path) {
		this.path = path;
		this.carts = [];
	}
	addCart = async () => {
		try {
			this.carts = await this.getCarts();
			const id = this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
			this.carts.push({ id, products: [] });
			return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
		} catch (error) {
			fs.writeFileSync(this.path, JSON.stringify(this.carts));
			return error;
		}
	};
	getCart = async () => {
		try {
			return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
		} catch (error) {
			return this.products;
		}
	};
	getProductByCartId = async id => {
		try {
			this.carts = await this.getCarts();
			return this.carts.find(cart => cart.id === id).products;
		} catch (error) {
			return error;
		}
	};
	addProductToCart = async (CartId, ProdId) => {
		const prod = await productManager.getProductById(ProdId);
		const cart = await this.getProductByCartId(CartId);
		if (cart.some(item => item.product === prod.id)) {
			const index = cart.findIndex(item => item.product === prod.id);
			cart[index].quantity++;
		} else {
			cart.push({ product: prod.id, quantity: 1 });
		}
		return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
	};
}

module.exports = CartManager;