const { terminate } = require("firebase/firestore");
const { db } = require("../src/data/data");
const { server } = require("../index");
const { deleteProducts, addNewProduct } = require("../src/models/products");
const data = require("./init.json");

exports.mochaHooks = {
  beforeAll: async () => {
    await deleteProducts();
    data.forEach(addNewProduct);
  },
  afterAll: async () => {
    await terminate(db);
    server.close();
  },
};
