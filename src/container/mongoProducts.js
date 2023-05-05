import {createProduct,getProductById,getallProducts,deleteProductById,deleteAllProducts,updateProducts} from '../repositories/products/index.js'

class mongoProducts {

    async save(obj){
        try{
            const result = await createProduct(...obj)
                        
            return result;
        }
        catch(error){
            console.log(error)
        }
    }


    async getByID(id){
        try{
            const result = await getProductById(id);
            return result
        }
        catch(error){
            console.log(error)
        }
    }    

    async getAll(){
        try{
            const result = await getallProducts();
            return result;
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            const deleteProduct = await deleteProductById(id);
            return deleteProduct;
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            const deleteProduct = await deleteAllProducts();
            return deleteProduct;
        }
        catch(error){
            console.log(error)
        }

    }

    async updateProduct(obj){
        try{
            const id = obj.id;
            const updateData = await updateProducts(id,obj);
            return updateData
        }
        catch(error){
            console.log(error)
        }
    }

}

export default mongoProducts;