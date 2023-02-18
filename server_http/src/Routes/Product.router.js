const router = require('express').Router();
const ProductManager = require('../ProductManager');
const NewProd = new ProductManager('db/db.json');

router.get('/',async (req,res) =>{
    const limite = Number(req.query.limite);
    const products = await NewProd.getProducts();
    if (limite) return res.status(200).json(products.splice(0,limite));
    res.status(200).json(products);
})

router.get('/:ProdId',async(req,res)=> {
    const id = Number(req.params.ProdId);
    const product = await NewProd.getProductsbyId(id);
    if (!product) return res.status(404).json({message:'Producto No encontrado'})
    res.status(200).json(product);
});
router.post('/',async (req,res)=> {
    const {title,description,code,price,status,stock,category,thumbnails} =req.body;
    if (!title || !description || !code || !price || !stock || !category || !status)
        return res.status(400).json({message:'Todos los campos son obligatorios'});
        await NewProd.addProduct(req.body)
});
router.put('/:ProdId', async (req,res) => {
    await NewProd.updateProduct(Number(req.params.ProdId),req.body);
    res.status(200).json({message:'Producto actualizado satisfactoriamente'});
})

router.delete('/:ProdId',async (req,res) =>{
    await NewProd.deleteProduct(Number(req.params.ProdId));
    res.status(200).json({message:'Producto eliminado correctamente'});
});
module.exports =router;