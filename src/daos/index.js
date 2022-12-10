import cartDaoArchive from './Cart/cartDaoArchive.js'
import cartDaofirebase from "./Cart/cartDaofirebase.js";

import productsDaoArchive from "./Products/productsDaoArchive.js";
import productsDaofirebase from "./Products/productsDaofirebase.js";


let ProductDAO = null;
let CartDAO = null;
let OrderDAO = null;

const type = process.env.PERS || "archive";

switch (type) {
  case "archive":
    ProductDAO = productsDaoArchive.getInstance();
    CartDAO = cartDaoArchive.getInstance();
    break;

  case "fs":
    ProductDAO = productsDaofirebase.getInstance();
    CartDAO = cartDaofirebase.getInstance();
    break;
}

export { ProductDAO, CartDAO, OrderDAO };