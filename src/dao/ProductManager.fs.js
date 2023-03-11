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
            const NewProd={...product};
            let Prueba =this.products.find(products => products.id == NewProd.id);
            
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
            if (error.errno === -4058) fs.writeFileSync(this.path, JSON.stringify(this.products));
			return this.products;
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


module.exports = ProductManager;

