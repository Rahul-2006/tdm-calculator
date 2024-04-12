/* eslint-disable no-unused-vars */
// POST / - feedback
const Ajv = require("ajv");
const schema = require("../app/schemas/feedback");
const request = require("supertest");
const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");

const ajv = new Ajv();

const validate = ajv.compile(schema);

let server;

beforeAll(async () => {
  server = await setupServer();
});

afterAll(async () => {
  await teardownServer();
});

describe("tests for feedback api", () => {
  let userToken;
  let adminToken;

  beforeAll(async () => {
    const userTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: "josegarcia@test.com",
        password: "Password1!!!"
      });
    userToken = userTokenResponse.body.token;

    // login as admin
    const adminTokenResponse = await request(server)
      .post("/api/accounts/login")
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    adminToken = adminTokenResponse.body.token;
  });

  afterAll(async () => {
    // cleanup state
    userToken = undefined;
    adminToken = undefined;
  });

  // POST for feedback
  it("should allow user to submit feedback(POST request)", async () => {
    const res = await request(server)
      .post("/api/feedbacks")
      .set("Authorization", `Bearer ${adminToken}`)
      .set("Content-Type", "application/json")
      .send({
        name: "testing-1-mike-odnis-dev",
        email: "example@email.com",
        comment: "Testing",
        forwardToWebTeam: 0
      });
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Created");
    expect(res.statusCode).toEqual(201);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBe(true);
  });
});
