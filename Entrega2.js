
const fs = require('fs');
const { title } = require('process');
class ProductManager{
    constructor(path){
        this.products=[];
    this.path=path;
    }  
    
    addProduct = async product => {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path,'utf-8'));
            const id = this.products.length===0?1:this.products[this.products.length-1].id+1;
            const NewProd={...product};
            let Prueba =this.products.find(products => products.code == NewProd.code);
            
            if (!Prueba){
                this.products.push({id,...product});
                await fs.promises.writeFile(this.path,JSON.stringify(this.products));
                return "Producto agregado!"
                
            }else{
                return "El producto ya existe"
                
            }
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
        let ProdId=this.products.find(products=> products.id === id)|| console.log("Not found");
        return ProdId
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
    
        if (!ProdMod) return 'Product Not Found';
        else {

            
            this.products[id-1] = { ...ProdMod, ...data };
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return 'Producto modificado correctamente';
        }
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




NuevoProducto.getProducts()
NuevoProducto.updateProduct(2,{title:"Monitor 32 Bangho"})

