import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
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

const cartSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        alias: '_id',
        default: 1
    },
    products: [cartItemSchema],
})

const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;