
const router = require('express').Router();
const CartManager = require('../CartManager')
const NewCart = new CartManager('src/db/cart.json')

router.post('/',async(req,res)=> {
	await NewCart.addCart();
	res.status(200).json({message:'Carrito cargado correctamente'})
})
router.get('/:CartId', async (req, res) => {
	const products = await NewCart.getProductsbyId(Number(req.params.CartId));
	if (!products) return res.status(404).json({message:'No se encontró el carrito'});
	res.status(200).json({products});
});

router.get('/:CartId/products/:ProductId', async (req, res) => {
	await NewCart.addProductToCart(Numbre(req.params.CartId),Number(req.params.ProductId))
	res.status(200).json({message:'Producto añadido satisfactoriamente'});
});



module.exports= router;


