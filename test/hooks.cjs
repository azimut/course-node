const { terminate } = require("firebase/firestore");
const { db } = require("../src/data/data");
const { server } = require("../index");

exports.mochaHooks = {
  afterAll: async () => {
    await terminate(db);
    server.close();
  },
};
