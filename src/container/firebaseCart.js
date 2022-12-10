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
                    Products: {}
                })
            }
            else{
                id = id + 1
                Newdata.push({
                    timestamp: Date.now(),
                    Products: {}
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
            const cart = await file.get();
            const newData = [];

            if (!cart.exists) {
              console.log('No such document!');
            } else {
                if(JSON.stringify(cart.data().Products) != '{}'){
                    
                    const itemProduct = cart.data().Products.idProducto == obj.productId ;
        
                    if(itemProduct){
                        newData.push({
                            Products:{
                                idProducto: obj.productId,
                                Cantidad: cart.data().Products.Cantidad ? cart.data().Products.Cantidad = parseInt(cart.data().Products.Cantidad) + 1 : cart.data().Products.Cantidad = 2
                            },
                            timestamp: new Date()
                        })                
                    }
                    else{
                        cart._fieldsProto.Products.push({idProducto: obj.productId})
                        newData.push({
                            Products: {
                                idProducto: obj.productId,
                            },
                            timestamp:  new Date()
                        })
                    }
                }
                else{
                    newData.push({
                        Products: {
                            idProducto: obj.productId,
                        },
                        timestamp:  new Date()
                    })            
                }
    
                const addCart = await this.collection.doc(obj.cartId.toString()).update(newData[0]);
    
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
            const newData = []

            if (!cart.exists) {
                console.log('No such document!');
              } else {
                const itemProduct = cart.data().Products.idProducto == obj.productId ;
                 if(itemProduct){
                    if(cart.data().Products.Cantidad && cart.data().Products.Cantidad !== 0){
                        newData.push({
                            Products:{
                                idProducto: obj.productId,
                                Cantidad: cart.data().Products.Cantidad - 1
                            },
                            timestamp: new Date()
                        }) 
                     }
                     else{
                        newData.push({
                            Products:{},
                            timestamp: new Date()
                        })                  
                    }
                }
                else{
                    return {error: "No existe ese producto en este carrito"}
                }


              }

              const addCart = await this.collection.doc(obj.cartId.toString()).update(newData[0]);
    
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