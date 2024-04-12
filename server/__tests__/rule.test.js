const request = require("supertest");
const Ajv = require("ajv");
const schema = require("../app/schemas/rule");
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

describe("tests for rule api", () => {
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

  // GET for all rules
  it("should get all rules(GET Request)", async () => {
    const res = await request(server)
      .get("/api/rules")
      .set("Authorization", `Bearer ${userToken}`);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(rule => {
      const valid = validate(rule);
      if (!valid) {
        console.log(validate.errors);
      }
      expect(valid).toBeTruthy();
    });
  });

  // GET by id
  it("should get rule by id(GET Request)", async () => {
    const res = await request(server)
      .get("/api/rules/1")
      .set("Authorization", `Bearer ${userToken}`);
    expect(Array.isArray(res.body)).toBeFalsy();
    expect(res.statusCode).toEqual(200);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBeTruthy();
  });

  // POST for rule
  it("should allow admin to add rule(POST request)", async () => {
    const res = await request(server)
      .post("/api/rules")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        calculationId: 2,
        code: "AREA_TOTAL",
        name: "Total Area",
        category: "input",
        dataType: "number",
        units: "sq m",
        value: null,
        functionBody: null,
        displayOrder: 1002,
        inactive: false,
        calculationPanelId: 6,
        used: false,
        displayFunctionBody: "return true;",
        minValue: 0,
        maxValue: null,
        choices: null,
        calcCode: null,
        required: false,
        minStringLength: null,
        maxStringLength: null,
        displayComment: false,
        description: "",
        mask: null,
        link: null,
        validationFunctionBody: null,
        readOnly: null
      });
    expect(res.statusCode).toEqual(201);
  });

  // PUT for rule
  it("should allow admin to update rule(PUT request)", async () => {
    const res = await request(server)
      .put("/api/rules/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        calculationId: 2,
        code: "AREA_TOTAL",
        name: "test rule updated",
        category: "input",
        dataType: "number",
        units: "sq m",
        value: null,
        functionBody: null,
        displayOrder: 1002,
        inactive: false,
        calculationPanelId: 6,
        used: false,
        displayFunctionBody: "return true;",
        minValue: 0,
        maxValue: null,
        choices: null,
        calcCode: null,
        required: false,
        minStringLength: null,
        maxStringLength: null,
        displayComment: false,
        description: "test rule description updated",
        mask: null,
        link: null,
        validationFunctionBody: null,
        readOnly: null
      });
    expect(res.body).toHaveProperty("id");
    expect(Array.isArray(res.body)).toBeFalsy();
    expect(res.statusCode).toEqual(200);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBeTruthy();
  });

  // DELETE for rule
  it("should allow admin to delete rule(DELETE request)", async () => {
    const res = await request(server)
      .delete("/api/rules/1")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
  });
}, 30000);
