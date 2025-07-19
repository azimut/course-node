const request = require("supertest");
const assert = require("assert");
const { app } = require("../index");
const { default_user } = require("../src/utils/constants");
const { generateToken } = require("../src/utils/token-generator");

const aToken = generateToken(default_user);

describe("POST /auth/login", () => {
  it("obtain JWT token", async () => {
    return request(app)
      .post("/auth/login")
      .send({ email: default_user.email, password: default_user.password })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((resp) => assert("token" in resp.body));
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
      .expect((resp) => assert(resp.body.length > 0));
  });
});
