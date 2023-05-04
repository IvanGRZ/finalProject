import mongoCart from "../../container/mongoCart.js";

class cartDaoMongo extends mongoCart {

  constructor() {
    super("Carrito");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new cartDaoMongo();
    }
    return this.instance;
  }
}

export default cartDaoMongo;