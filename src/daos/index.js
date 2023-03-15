import cartDaoArchive from './Cart/cartDaoArchive.js'
import cartDaofirebase from "./Cart/cartDaofirebase.js";

import productsDaoArchive from "./Products/productsDaoArchive.js";
import productsDaofirebase from "./Products/productsDaofirebase.js";

import authDaofirebase from "./Auth/authDaofirebase.js"


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
    break;
}

export { ProductDAO, CartDAO, AuthDao, OrderDAO };