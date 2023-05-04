import {createOrder, getallOrders, deleteOrderById, getOrderById} from '../repositories/Orders/index.js'

class mongoOrder {

    async createOrder(obj){
        try{

            const result = await createOrder(obj);
            return result;
            
        }
        catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            const data = await getallOrders();
            return data;
        }
        catch(error){
            console.log(error)
        }
    }

    async delteOrder(id){
        try{
            const deleteOrder = await deleteOrderById(id);
            return deleteOrder;
        }
        catch(error){
            console.log(error)
        }
    }
    
    async addProductsOrder(orderId, orderObj){
        try {
            // Buscamos la orden
            const order = await getOrderById(orderId);
        
            // Si la orden no existe, lanzamos un error
            if (!order) {
              console.log('No such document!');
            }
        
            // Buscamos el producto en el carrito
            const itemIndex = order.items.findIndex((item) => item.idProducto === orderObj.productId);
        
            // Si el producto no existe en el carrito, lanzamos un error
            if (itemIndex === -1) {
                order.items.push(
                    {
                        idProducto: newItem.itemId,
                        cantidad: 1
                    }
                ); // El producto no existe en el carrito, agregarlo con cantidad 1
            }
            else {
              // Si el ítem tiene una cantidad igual o menor a 1, lo eliminamos del carrito
              order.items.push(
                    { 
                        cantidad:  order.items[itemIndex].cantidad ? order.items[itemIndex].cantidad = parseInt(order.items[itemIndex].cantidad) + 1 : 2
                    }
                );            
            }
        
            // Guardamos los cambios en la base de datos
            await order.save();
        
            return order;

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductOrder(orderId, productId){
        try {
            // Buscamos la orden
            const order = await getOrderById(orderId);
        
            // Si la orden no existe, lanzamos un error
            if (!order) {
              console.log('No such document!');
            }
        
            // Buscamos la orden
            const itemIndex = order.items.findIndex((item) => item.idProducto === productId);
        
            // Si el producto no existe en la orden, lanzamos un error
            if (itemIndex === -1) {
              return {error: "No existe ese producto en esta orden"}
            }
        
            // Si el producto tiene una cantidad mayor a 1, reducimos la cantidad
            if (order.items[itemIndex].cantidad > 1) {
                order.items[itemIndex].cantidad--;
          } 
          else {
              // Si el ítem tiene una cantidad igual o menor a 1, lo eliminamos del carrito
              order.items.splice(itemIndex, 1);
          }
        
            // Guardamos los cambios en la base de datos
            await order.save();
        
            return order;
            
          } catch (error) {
              console.log(error)
          }        
    }
}

export default mongoOrder;
