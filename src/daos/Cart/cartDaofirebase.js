import firebaseCart from "../../container/firebaseCart.js";

class cartDaofirebase extends firebaseCart {

  constructor() {
    super("Carrito");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new cartDaofirebase();
    }
    return this.instance;
  }
}

export default cartDaofirebase;