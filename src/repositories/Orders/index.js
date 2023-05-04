import OrdersModel from '../../models/orders/index.js'


export const createOrder = async (order) => {
    const orders = new OrdersModel(order);
    return orders.save();
}

export const getallOrders = async () => {
    return OrdersModel.find().exec()
}

export const deleteOrderById = async(id) => {
    return OrdersModel.findOneAndDelete(id).exec();
}

export const getOrderById = async(id) =>{
    return await OrdersModel.findOne({id}).populate("items.productId");

}