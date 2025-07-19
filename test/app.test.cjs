const { assert } = require("chai");
const request = require("supertest");
const { app } = require("../index");
const { default_user } = require("../src/utils/constants");
const { generateToken } = require("../src/utils/token-generator");
const data = require("./init.json");

const aToken = generateToken(default_user);
const newProduct = data[3];

describe("POST /auth/login", () => {
  it("obtain JWT token", async () => {
    return request(app)
      .post("/auth/login")
      .send({ email: default_user.email, password: default_user.password })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((resp) => assert.property(resp.body, "token"));
  });
});

describe("GET /api/products", () => {
  it("fail auth", async () => {
    return request(app)
      .get("/api/products")
      .expect(401)
      .expect("Content-Type", /json/);
  });
  it("get all products", async () => {
    return request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${aToken}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((resp) => assert.isNotEmpty(resp.body));
  });
});

async function doSearch(query, status, size) {
  return request(app) // global
    .get("/api/products/search")
    .set("Authorization", `Bearer ${aToken}`) // global
    .query(query)
    .expect(status)
    .expect("Content-Type", /json/)
    .expect((resp) => assert.strictEqual(resp.body.length, size));
}
describe("GET /api/products/search", () => {
  it("minPrice=10 search", async () => doSearch({ minPrice: 10 }, 200, 2));
  it("maxPrice=1 search", async () => doSearch({ maxPrice: 1 }, 200, 0));
  it("category=cpu search", async () => doSearch({ category: "cpu" }, 200, 1));
  it("name=555 search", async () => doSearch({ name: "555" }, 200, 1));
  it("foo=bar search", async () =>
    request(app) // global
      .get("/api/products/search")
      .set("Authorization", `Bearer ${aToken}`) // global
      .query({ foo: "bar" })
      .expect(400));
});

describe("POST /api/products/create", () => {
  it("New product.", async () => {
    return request(app)
      .post("/api/products/create")
      .set("Authorization", `Bearer ${aToken}`) // global
      .send(newProduct)
      .expect(201)
      .expect((resp) => assert.property(resp.body, "id"))
      .then((resp) => (newProduct.id = resp.body.id)); // global
  });
});

describe("PATCH /api/products/:id", () => {
  it("Modify new product", async () => {
    return request(app)
      .patch(`/api/products/${newProduct.id}`)
      .set("Authorization", `Bearer ${aToken}`) // global
      .send({ price: 777 })
      .expect(204);
  });
});

describe("PUT /api/products/:id", () => {
  it("Modify new product", async () => {
    return request(app)
      .put(`/api/products/${newProduct.id}`)
      .set("Authorization", `Bearer ${aToken}`) // global
      .send({ name: "6502C", price: 6.5, categories: newProduct.categories })
      .expect(204);
  });
});

describe("DELETE /api/products/:id", () => {
  it("Delete new product", async () => {
    return request(app)
      .delete(`/api/products/${newProduct.id}`)
      .set("Authorization", `Bearer ${aToken}`) // global
      .expect(204);
  });
});
