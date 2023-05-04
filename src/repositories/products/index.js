import productsModel from '../../models/products/index.js'

export const createProduct = async (product) => {
    const products = new productsModel(product);
    return products.save();
}

export const getProductById = async (id) => {
    return productsModel.findById(id).exec();
}

export const getallProducts = async () => {
    return productsModel.find().exec()
}

export const deleteProductById = async(id) => {
    return productsModel.findOneAndDelete(id).exec();
}

export const deleteAllProducts = async(id) => {
    return productsModel.deleteMany().exec();
}

export const updateProducts = async(id, obj) => {
    return productsModel.findByIdAndUpdate(id, obj, {new: true})
}