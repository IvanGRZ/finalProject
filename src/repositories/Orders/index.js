import OrdersModel from '../../models/orders/index.js'


export const createOrder = async (order) => {
    const orders = new OrdersModel(order);
    return orders.save();
}

export const getallOrders = async () => {
    return OrdersModel.find().exec()
}

export const deleteOrderById = async(orderNumber) => {
    return OrdersModel.findOneAndDelete({orderNumber}).exec();
}

export const getOrderById = async(orderNumber) =>{
    return await OrdersModel.findOne({orderNumber})

}