import mongoOrder from '../../container/mongoOrder.js'

class ordersDaoMongo extends mongoOrder {

  constructor() {
    super("Ordernes");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ordersDaoMongo();
    }
    return this.instance;
  }
}

export default ordersDaoMongo;