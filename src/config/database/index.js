import mongoose from 'mongoose';
import logger4 from '../../loggers/index.js';
import { getMongoConfig } from '../session/index.js'

import dotenv from 'dotenv'

dotenv.config();

const mongooseConnect = async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/store-db';

    try {
        await mongoose.connect(MONGO_URI, getMongoConfig());
        logger4.info('MONGOOSE CONNECTION OK');
    } 
    catch (error) {
        logger4.error(error);
    }
}

const noMongoConnect = () =>{
    logger4.info('firebase persistance selected');

}

export default process.env.PERS == 'mongo' ? mongooseConnect : noMongoConnect;
