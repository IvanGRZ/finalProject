import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        alias: '_id',
        default: 1
    },
    nombre: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,    
    },
    codigo: {
        type: String,
        required: true,   
        trim: true     
    },
    foto:{
        type: String,
        required: true,   
        trim: true      
    },
    precio:{
        type: Number,
        required: true,   
        trim: true        
    },
    stock: {
        type: Number,
        required: true,    
    }
})

const productsModel = mongoose.model('products', productsSchema);

export default productsModel;