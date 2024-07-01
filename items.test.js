process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

let item1 = { name: "Cheerios", price: 3.0 };

beforeEach(function () {
  items.length = 0;
  items.push(item1);
});

afterEach(function () {
  items.length = [];
});

describe("GET /items", function () {
  test("Get list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([{ name: "Cheerios", price: 3.0 }]);
  });
});

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const response = await request(app).post(`/items`).send(item1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: "Cheerios", price: 3.0 }]);
  });
});

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item1.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(item1);
  });
});

describe("PATCH /items/:name", function () {
  test("Patches an item", async function () {
    const response = await request(app).patch(`/items/${item1.name}`).send({
      name: "Frosted Flakes",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: "Frosted Flakes", price: 3.0 }]);
  });
});

describe("DELETE /items/:name", function () {
  test("Delete an item", async function () {
    const response = await request(app).delete(`/items/${item1.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("Deleted");
  });
});
