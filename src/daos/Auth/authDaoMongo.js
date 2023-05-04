import mongoAuth from "../../container/mongoAuth.js";

class authDaoMongo extends mongoAuth {

  constructor() {
    super("user");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new authDaoMongo();
    }
    return this.instance;
  }
}

export default authDaoMongo;