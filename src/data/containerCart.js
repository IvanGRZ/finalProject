import * as fs from 'fs';

export class containerCart {

    async getAll(){
        try{
            const file = await fs.promises.readFile(`./src/data/models/cart.txt`, 'utf-8');
            const fileParse = JSON.parse(file);

            return fileParse
        }
        catch(error){
            console.log(error)
        }
    }

    async createCart(){
        try{
            const file = await fs.promises.readFile(`./src/data/models/cart.txt`, 'utf-8');
            const dataFileParse = JSON.parse(file);
            const id = dataFileParse.length

            if(id == 0){
                dataFileParse.push({
                    id: 1,
                    timestamp: Date.now(),
                    products: []
                })
            }
            else{
                dataFileParse.push({
                    id: id + 1,
                    timestamp: Date.now(),
                    products: []
                })                
            }

            await fs.promises.writeFile(`./src/data/models/cart.txt`, JSON.stringify ([...dataFileParse]))

            return dataFileParse;
        }
        catch(error){
            console.log(error)
        }
    }

    async addCartproduct(obj){
        try{
            const cartfile = await fs.promises.readFile(`./src/data/models/cart.txt`, 'utf-8');
            const productfile = await fs.promises.readFile(`./src/data/models/products.txt`, 'utf-8');
            const cartFileParse = JSON.parse(cartfile);
            const productFileParse = JSON.parse(productfile);

            const cart = cartFileParse.find(product => product.id == obj.cartId);
            const product = productFileParse.find(product => product.id == obj.productId);

            if(cart.products.length){
                const itemProduct = cart.products.find(product => product.id == obj.productId);
                const index = cart.products.findIndex((num) => num.id === obj.productId);

                if(itemProduct != undefined){
                    cart.products.map((item,intenalIndex) => {

                        if(intenalIndex == index){
                            item.cantidad ? item.cantidad = parseInt(item.cantidad) + 1 : item.cantidad = 2;
                        }

                    })                    
                }
                else{
                    cart.products.push(product)
                }
            }
            else{
                cart.products.push(product)
            }

            const index = cartFileParse.findIndex((num) => num.id === obj.cartId);
            cartFileParse.splice(index, 1);
            cartFileParse.push(cart);

            await fs.promises.writeFile(`./src/data/models/cart.txt`, JSON.stringify ([...cartFileParse]))

            return cartFileParse;
        }
        catch(error){
            console.log(error)
        }
    }

    async delteProduct(obj){
        try{
            const cartfile = await fs.promises.readFile(`./src/data/models/cart.txt`, 'utf-8');
            const cartFileParse = JSON.parse(cartfile);

            const cart = cartFileParse.find(product => product.id == obj.cartId);
            const product = cart.products.find(product => product.id == obj.productId);

            if (product != undefined){
                if(product.cantidad){
                    product.cantidad = product.cantidad - 1
                } 
                else{
                    const index = cart.products.findIndex((num) => num.id === obj.productId);
                    cart.products.splice(index, 1);
                }
            }


            const index = cartFileParse.findIndex((num) => num.id === obj.cartId);
            cartFileParse.splice(index, 1);
            cartFileParse.push(cart);

            await fs.promises.writeFile(`./src/data/models/cart.txt`, JSON.stringify ([...cartFileParse]))

            return cartFileParse;
        }
        catch(error){
            console.log(error)
        }
    }

    async delteCart(obj){
        try{
            const file = await fs.promises.readFile(`./src/data/models/cart.txt`, 'utf-8');
            const fileParse = JSON.parse(file);

            const filterDelete = fileParse.filter(product => product.id !== obj.id)
            await fs.promises.writeFile(`./src/data/models/cart.txt`, JSON.stringify(filterDelete))
            
            return filterDelete;
        }
        catch(error){
            console.log(error)
        }
    }

}