const { log } = require('console');
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
    getProducts= async () => {
        try {
            return this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
        } catch (error) {
            return error
        }
    }

    getProductsbyId= async id =>
    {   this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
        this.products.find(products=> products.id === id) || console.log("Not found");
    }
    deleteProduct =async id =>{
        this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
        let ProdBor= this.products.find(product => product.id == id);
        if (!ProdBor) {
            return "El producto que desea borrar no existe"}
        else {
        this.products = this.products.filter(product => product.id !== id);
        return "Producto borrado correctamente";}
    }
    updateProduct=async(id,data)=>{
        this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
        let ProdMod = this.products.find(product => product.id == id);
        console.log(ProdMod);
        if (!ProdMod) return " Product Not Found";
        let ProdIdx = this.products.findIndex(product => product.id == id);
        this.products[ProdIdx] = { ...ProdMod, ...data };
		await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		return 'Producto modificado correctamente';
    };

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

/* Buscando un id que no coincide */
console.error(NuevoProducto.getProductsbyId(2)); 


NuevoProducto.getProducts().then(res => console.log(res));
NuevoProducto.deleteProduct(1).then(res=>console.log(res));
NuevoProducto.updateProduct(2,{title:"Monitor 32 Bangho"})

