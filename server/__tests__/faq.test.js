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

const apiRoute = "/api/faqs";

const response = async (method, parameters) => {
  const res = await request(server)[method](`${apiRoute}/${parameters}`);
  return res;
};

describe("", () => {
  let faqId;

  beforeEach(async () => {
    const res = await response("get", "");
    faqId = res.body[0].id;
  });

  afterEach(async () => {
    faqId = undefined;
  });

  // GET / <- all
  it("Should get all faqs", async () => {
    const res = await response("get", "");
    expect(Array.isArray(res.body).toBeTruthy);
    res.body.forEach(faq => {
      expect(faq).toHaveProperty("id");
      expect(faq).toHaveProperty("name");
      expect(faq).toHaveProperty("displayOrder");
      expect(faq).toHaveProperty("faqs");

      const faqs = JSON.parse(faq.faqs);
      faqs.forEach(faqItem => {
        expect(faqItem).toHaveProperty("id");
        expect(faqItem).toHaveProperty("question");
        expect(faqItem).toHaveProperty("answer");
        expect(faqItem).toHaveProperty("faqCategoryId");
        expect(faqItem).toHaveProperty("displayOrder");
      });
    });
  });

  // GET /:id <- by id
  it("Should get faqs by id", async () => {
    const res = await response("get", faqId);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(faqId);
  });

  // GET /:id <- by inexistent id
  it("Should NOT get faqs by id", async () => {
    const res = await response("get", 9999999);
    expect(res.statusCode).toEqual(404);
  });

  // POST /
  it("Should post faqs", async () => {
    const res = await response("post", "");
    expect(res.statusCode).toEqual(200);
  });

  // PUT /:id <- by id
  it("Should put faqs by id", async () => {
    const res = await response("put", faqId);
    expect(res.statusCode).toEqual(200);
  });

  // DELETE /id <- by id
  it("Should delete faqs by id", async () => {
    const res = await response("delete", faqId);
    expect(res.statusCode).toEqual(200);
  });
});
