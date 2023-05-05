import {db} from '../utils/firebase.js'

class firebaseOrder {

    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async createOrder(obj){
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
                    Products: [obj]
                })
            }
            else{
                id = id + 1
                Newdata.push({
                    timestamp: Date.now(),
                    Products: [obj]
                })                
            }

            const result = await this.collection.doc(id.toString()).set(Newdata[0]);   

            return result;
            
        }
        catch(error){
            console.log(error)
        }
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

    async delteOrder(obj){
        try{
            const deleteCart = await this.collection.doc(obj.id.toString()).delete();
            return deleteCart;
        }
        catch(error){
            console.log(error)
        }
    }

    async addProductsOrder(obj){
        try{
            const file = this.collection.doc(obj.orderId.toString());
            const order  = await file.get();
            const Products = [];

            Products.push(order.data());

            if (!cart.exists) {
              console.log('No such document!');
            } else {
                if(JSON.stringify(order.data().Products.length) != '[{}]'){
                    const itemProduct = order.data().Products.find(element => element.idProducto == obj.productId)
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
    
                const addOrder = await this.collection.doc(bj.orderId.toString()).update(...Products);
    
                return addOrder;            
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteProductOrder(obj){
        try{
            const file = this.collection.doc(obj.orderId.toString());
            const order = await file.get();
            const Products = []

            Products.push(order.data());

            if (!order.exists) {
                console.log('No such document!');
              } else {

                const itemProduct = order.data().Products.find(element => element.idProducto == obj.productId)

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
                    return {error: "No existe ese producto en esta orden"}
                }
              }

              const addOrder = await this.collection.doc(obj.orderId.toString()).update(...Products);
    
              return addOrder; 
        }
        catch(error){
            console.log(error)
        }     
    }

}

export default firebaseOrder;