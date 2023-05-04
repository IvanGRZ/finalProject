import mongoProducts from "../../container/mongoProducts.js";

class productsDaoMongo extends mongoProducts {

  constructor() {
    super("Productos");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new productsDaoMongo();
    }
    return this.instance;
  }
}

export default productsDaoMongo;