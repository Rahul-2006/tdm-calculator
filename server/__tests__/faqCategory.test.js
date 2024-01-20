const request = require("supertest");
const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");
const jwtSession = require("../middleware/jwt-session");

let server;

beforeAll(async () => {
  server = await setupServer();
  jwtSession.validateRoles(["isAdmin"]);
});

afterAll(async () => {
  await teardownServer();
});

describe("FAQ Category Controller", () => {
  let adminToken;

  beforeAll(async () => {
    const adminCredentials = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    };

    const loginResponse = await request(server)
      .post("/api/accounts/login")
      .send(adminCredentials);

    adminToken = loginResponse.body.token;
  });

  // Test
  // GET "/" all FAQ categories
  it("Should get all FAQ categories", async () => {
    try {
      const res = await request(server)
        .get("/api/faqs")
        .set("Authorization", `Bearer ${adminToken}`);
      // console.log(res.status);
      // console.log("Response Body:", res.body);
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    } catch (error) {
      console.error("Test failed with error:", error);
      throw error;
    }
  });
});
