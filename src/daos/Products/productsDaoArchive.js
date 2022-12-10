import archiveProducts from "../../container/archiveProducts.js";

class productsDaoArchive extends archiveProducts {

  constructor() {
    super("src/data/models/products.txt");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new productsDaoArchive();
    }
    return this.instance;
  }
}

export default productsDaoArchive;