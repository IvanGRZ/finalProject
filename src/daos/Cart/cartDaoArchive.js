import archiveCart from "../../container/archiveCart.js";

class cartDaoArchive extends archiveCart {

  constructor() {
    super("src/data/models/products.txt");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new cartDaoArchive();
    }
    return this.instance;
  }
}

export default cartDaoArchive;