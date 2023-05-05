import dotenv from 'dotenv'

import cartDaoArchive from './Cart/cartDaoArchive.js'
import cartDaofirebase from "./Cart/cartDaofirebase.js";
import cartDaoMongo from './Cart/cartDaoMongo.js'

import productsDaoArchive from "./Products/productsDaoArchive.js";
import productsDaofirebase from "./Products/productsDaofirebase.js";
import productsDaoMongo from './Products/productsDaoMongo.js';

import authDaofirebase from "./Auth/authDaofirebase.js"
import authDaoMongo from './Auth/authDaoMongo.js'

import ordersDaoMongo from './Orders/ordersDaoMongo.js';
import ordersDaoFirebase from './Orders/ordersDaoFirebase.js'


dotenv.config();

let ProductDAO = null;
let CartDAO = null;
let AuthDao = null;
let OrderDAO = null;

const type = process.env.PERS || "fs";


switch (type) {
  case "archive":
    ProductDAO = productsDaoArchive.getInstance();
    CartDAO = cartDaoArchive.getInstance();
    break;

  case "fs":
    ProductDAO = productsDaofirebase.getInstance();
    CartDAO = cartDaofirebase.getInstance();
    AuthDao = authDaofirebase.getInstance();
    OrderDAO = ordersDaoFirebase.getInstance();
    break;

  case "mongo":
    AuthDao = authDaoMongo.getInstance();
    OrderDAO = ordersDaoMongo.getInstance();
    CartDAO = cartDaoMongo.getInstance();
    ProductDAO = productsDaoMongo.getInstance();
  break;    
}

export { ProductDAO, CartDAO, AuthDao, OrderDAO };