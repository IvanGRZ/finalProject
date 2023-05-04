import firebaseOrder from "../../container/firebaseOrder.js";

class ordersDaoFirebase extends firebaseOrder {

  constructor() {
    super("Ordernes");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ordersDaoFirebase();
    }
    return this.instance;
  }
}

export default ordersDaoFirebase;