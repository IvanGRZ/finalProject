import {db} from '../utils/firebase.js'

class firebaseCart {

    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async getAll(){
        try{
            const snapshot = await this.collection.get();
            const data = [];

            snapshot.forEach(doc => {
                data.push(doc.data())
            })
            
            return data

        }
        catch(error){
            console.log(error)
        }
    }

    async createCart(){
        try{

            const snapshot = await this.collection.get();
            const data = [];
            const Newdata = [];

            snapshot.forEach(doc => {
                data.push(doc.data())
            })

            let id = data.length;                        

            if(id == 0){
                id = 1
                Newdata.push({
                    timestamp: Date.now(),
                    Products: [{}]
                })
            }
            else{
                id = id + 1
                Newdata.push({
                    timestamp: Date.now(),
                    Products: [{}]
                })                
            }

            const result = await this.collection.doc(id.toString()).set(Newdata[0]);   

            return result;
            
        }
        catch(error){
            console.log(error)
        }
    }

    async addCartproduct(obj){
        try{
            const file = this.collection.doc(obj.cartId.toString());
            const cart  = await file.get();
            const Products = [];

            Products.push(cart.data());

            if (!cart.exists) {
              console.log('No such document!');
            } else {
                if(JSON.stringify(cart.data().Products.length) != '[{}]'){
                    const itemProduct = cart.data().Products.find(element => element.idProducto == obj.productId)
                    if(itemProduct != undefined){
                        Products[0].Products.forEach(element => {
                            if (element.idProducto == itemProduct.idProducto){
                                element.Cantidad = element.Cantidad ? element.Cantidad = parseInt(element.Cantidad) + 1 : 2
                            }
                        });
                    }
                    else{

                        Products[0].Products.push({ idProducto: obj.productId})
                    }
                }
                else{
                    Products.push(
                        { 
                            Products: [
                                {
                                    idProducto: obj.productId
                                }
                            ], 
                            timestamp: new Date()
                        }
                    )            
                }
    
                const addCart = await this.collection.doc(obj.cartId.toString()).update(...Products);
    
                return addCart;            
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async delteProduct(obj){
        try{
            const file = this.collection.doc(obj.cartId.toString());
            const cart = await file.get();
            const Products = []

            Products.push(cart.data());

            if (!cart.exists) {
                console.log('No such document!');
              } else {

                const itemProduct = cart.data().Products.find(element => element.idProducto == obj.productId)

                 if(itemProduct != undefined){
                    
                    Products[0].Products.map((element, index) => {
                        if (element.idProducto == itemProduct.idProducto){
                            if(element.Cantidad){
                                element.Cantidad = element.Cantidad - 1
                                if(element.Cantidad == 0){
                                    Products[0].Products.splice(index, 1)
                                }
                            }
                            else{
                                Products[0].Products.splice(index, 1)
                            }
                        }
                    });
                }
                else{
                    return {error: "No existe ese producto en este carrito"}
                }
              }

              const addCart = await this.collection.doc(obj.cartId.toString()).update(...Products);
    
              return addCart; 
        }
        catch(error){
            console.log(error)
        }
    }

    async delteCart(obj){
        try{
            const deleteCart = await this.collection.doc(obj.id.toString()).delete();
            return deleteCart;
        }
        catch(error){
            console.log(error)
        }
    }

}

export default firebaseCart;