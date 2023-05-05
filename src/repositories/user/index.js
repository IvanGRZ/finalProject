import userModel from '../../models/user/index.js'

export const createUser = async (userData) => {
    const user = new userModel(userData);
    return user.save();
}

export const getUserById = async (id) => {
    return userModel.findById({id}).exec();
}

export const getUserByEmail = async (email) => {
    return userModel.findOne({email}).exec();
}
