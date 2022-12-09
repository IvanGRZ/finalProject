import * as fs from 'fs';

class archiveProducts {

    constructor(route) {
        this.route = route;
    }

    async save(obj){
        try{
            const file = await fs.promises.readFile(this.route, 'utf-8');
            const dataFileParse = JSON.parse(file);
            const id = dataFileParse.length;
                        
            obj.map((item,index)=> {
                item.id = id + (index + 1)
                item.timestamp = Date.now();
            });
            
            dataFileParse.push(...obj)
            await fs.promises.writeFile(this.route, JSON.stringify ([...dataFileParse]))

            return dataFileParse;
        }
        catch(error){
            console.log(error)
        }
    }

    async getByID(id){
        try{
            const file = await fs.promises.readFile(this.route, 'utf-8');
            const fileParse = JSON.parse(file);
            const element = fileParse.find(product => product.id == id);

            if(element){
                return element
            }
            else{
                return null
            }
        }
        catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            const file = await fs.promises.readFile(this.route, 'utf-8');
            const fileParse = JSON.parse(file);

            return fileParse
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            const file = await fs.promises.readFile(`./src/data/models/products.txt`, 'utf-8');
            const fileParse = JSON.parse(file);

            const filterDelete = fileParse.filter(product => product.id !== id)
            await fs.promises.writeFile(`./src/data/models/products.txt`, JSON.stringify(filterDelete))
            
            return filterDelete;
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(`./src/data/models/products.txt`, '[]')
        }
        catch(error){
            console.log(error)
        }

    }

    async updateProduct(obj){
        try{
            const file = await fs.promises.readFile(`./src/data/models/products.txt`, 'utf-8');
            const fileParse = JSON.parse(file);
        
            fileParse.splice(parseInt(obj.id - 1), 1);
            fileParse.push(obj)

            await fs.promises.writeFile(`./src/data/models/products.txt`, JSON.stringify(fileParse))

            return fileParse;
        }
        catch(error){
            console.log(error)
        }
    }

}

export default archiveProducts;