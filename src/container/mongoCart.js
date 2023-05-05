import {getallCarts, getCart,createCart,deleteCartById} from '../repositories/cart/index.js'

class mongoCart {

    async getAll(){
        try{
            const data = await getallCarts();
            return data;
        }
        catch(error){
            console.log(error)
        }
    }

    async createCart(){
        try{

            const result = await createCart();
            return result;
            
        }
        catch(error){
            console.log(error)
        }
    }

    async addCartproduct(obj){

        try {
            // Obtener el carrito del usuario
            const cartId = obj.cartId;
            let cart = await getCart(cartId);
        
            // Verificar si el producto ya existe en el carrito
            const itemIndex = cart.products.findIndex(item => item.idProducto === obj.productId);

            if (itemIndex === -1) {
                cart.products.push({ idProducto: obj.productId, cantidad: 1}); // El producto no existe en el carrito, agregarlo con cantidad 1

            } else { // El producto ya existe en el carrito, aumentar su cantidad
                cart.products[itemIndex].cantidad++

            }
            cart = await cart.save()
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async delteProduct (obj){
        try {
          // Buscamos el carrito
          const cartId = obj.cartId;
          let cart = await getCart(cartId);
      
          // Si el carrito no existe, lanzamos un error
          if (!cart) {
            console.log('No such document!');
          }
      
          // Buscamos el producto en el carrito
          const itemIndex = cart.products.findIndex((item) => item.idProducto === obj.productId);
      
          // Si el producto no existe en el carrito, lanzamos un error
          if (itemIndex === -1) {
            return {error: "No existe ese producto en este carrito"}
          }
      
          // Si el producto tiene una cantidad mayor a 1, reducimos la cantidad
          if (cart.products[itemIndex].cantidad > 1) {
            cart.products[itemIndex].cantidad--;
        } 
        else {
            // Si el ítem tiene una cantidad igual o menor a 1, lo eliminamos del carrito
            cart.products.splice(itemIndex, 1);
        }
      
          // Guardamos los cambios en la base de datos
          await cart.save();
      
          return cart;
        } catch (error) {
            console.log(error)
        }
    };


    async delteCart(obj){
        try{
            const deleteCart = await deleteCartById(obj.id);
            return deleteCart;
        }
        catch(error){
            console.log(error)
        }
    }
}

export default mongoCart;