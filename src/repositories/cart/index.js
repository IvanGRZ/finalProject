import cartModel from '../../models/cart/index.js'


export const getallCarts = async () => {
    return cartModel.find().exec()
}

export const getCart = async (id) => {
    return await cartModel.findOne({id}).populate("items.productId");
}

export const createCart = async () => {
    const cart = new cartModel();
    return cart.save();
}

export const deleteCartById = async(id) => {
    return cartModel.findOneAndDelete(id).exec();
}