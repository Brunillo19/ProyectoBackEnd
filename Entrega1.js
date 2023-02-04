const fs = require('fs');
class ProductManager{
    constructor(path){
        this.products=[];
    this.path=path;
    }  
    
    addProduct = async product => {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
            const id = this.products.length===0?1:this.products[this.products.length-1].id+1;
            this.products.push({id,...product});
            await fs.promises.writeFile(this.path,JSON.stringify(this.products));
            return "Producto agregado!"
        } catch (error) {
            return error
        }
    }
    /* addProduct = ({title,description,price,thumbnail,code,stock})=>{
        if (!title || (title=="") ||  !description ||(description=="") || !price ||(price=="") || !thumbnail ||(thumbnail=="")|| !code ||(code=="")|| !stock||(stock=="")) return console.log("Todos los campos son requeridos");

        const validateCode = this.products.some(product=>product.code === code);
        if(validateCode) {
            console.log( ("Este código ya existe"))}
        else{
        const id = this.products.length===0?1:this.products[this.products.length-1].id+1;
        this.products.push({id,title,description,price,thumbnail,code,stock})}
    } */
    getProducts= ()=>{return this.products};
    getProductsbyId= async id =>
    {   thisthis.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
        this.products.find(products=> products.id === id) || console.log("Not found");
    }
    deleteProduct
}
const NuevoProducto = new ProductManager('./db/db.json');


NuevoProducto.addProduct({
    title:'Monitor 22 Samsung',
    description:'Este monitor de 22 pulgadas te va a resultar cómodo para estudiar trabajar o ver una película en tus tiempos de ocio.',
    price:'14500',
    thumbnail:'https://res.cloudinary.com/dfbuxinmw/image/upload/c_scale,w_400/v1670693774/00406004-177456-177456-01.png-177456-01_o7ew9c.png',
    code:'134651',
    stock:'4'
    
})
/* Añadiendo un producto con un campo faltante */
NuevoProducto.addProduct({
    title:'Monitor 22 Samsung',
    description:'Este monitor de 22 pulgadas te va a resultar cómodo para estudiar trabajar o ver una película en tus tiempos de ocio.',
    price:'14500',
    thumbnail:'https://res.cloudinary.com/dfbuxinmw/image/upload/c_scale,w_400/v1670693774/00406004-177456-177456-01.png-177456-01_o7ew9c.png',
    code:'134651',
    
    
})
/* Mostrando todos los productos añadidos */

/* Buscando un id que no coincide */
console.error(NuevoProducto.getProductsbyId(2)); 




