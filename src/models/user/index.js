import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,    
    },
    address: {
        type: String,
        required: true,   
        trim: true     
    },
    age:{
        type: String,
        required: true,   
        trim: true      
    },
    picture:{
        type: String,
        required: true,   
        trim: true        
    },
    name: {
        type: String,
        required: true,    
    },
    phone:{
        type: String,
        required: true,    
        trim: true        
    }
})

const userModel = mongoose.model('user', userSchema);

export default userModel;