import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    idProducto:{
        type: Number,
        required: true,
        alias: '_id'
    },
    cantidad: {
        type: Number,
        required: false
    }
})

const ordersSchema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        alias: '_id'
    },
    products: [OrderItemSchema],
    date: {
        type: Date,
        required: true,    
    },
    state: {
        type: String,
        required: true,   
        trim: true     
    },
    clientEmail:{
        type: String,
        required: true,   
        trim: true      
    },
})

const OrdersModel = mongoose.model('orders', ordersSchema);

export default OrdersModel;