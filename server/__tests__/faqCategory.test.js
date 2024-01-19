const request = require("supertest");
const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");

let server;

beforeAll(async () => {
  server = await setupServer();
});

afterAll(async () => {
  await teardownServer();
});

describe("FAQ Category Controller", () => {
  // GET "/" all FAQ categories
  it("Should get all FAQ categories", async () => {
    const res = await request(server).get("/");
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // GET "/:id" FAQ category by id
  it("Should get a FAQ category by ID", async () => {
    const res = await request(server).get("/1");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  // POST "/" create a new FAQ category
  it("Should create a new FAQ category", async () => {
    const newFaqCategory = {
      name: "Test Category",
      displayOrder: 1,
      faqs: JSON.stringify([{ question: "Test", answer: "Test" }])
    };
    const res = await request(server).post("/").send(newFaqCategory);
    expect(res.status).toEqual(201);
  });

  // PUT "/:id" update a FAQ category
  it("Should update a FAQ category", async () => {
    const updatedFaqCategory = {
      id: 1,
      name: "Updated Test Category",
      displayOrder: 1,
      faqs: JSON.stringify([
        { question: "Updated Test", answer: "Updated Test" }
      ])
    };
    const res = await request(server).put(`/1`).send(updatedFaqCategory);
    expect(res.status).toEqual(200);
  });

  // DELETE "/:id" delete a FAQ category
  it("Should delete a FAQ category", async () => {
    const res = await request(server).delete("/1");
    expect(res.status).toEqual(200);
  });
});
