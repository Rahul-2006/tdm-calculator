// GET, GET :id, POST, PUT /hide /trash /snapshot /renameSnapshot /:id, DELETE /:id - project
const request = require("supertest");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const schema = require("../app/schemas/project");
const {
  setupServer,
  teardownServer
} = require("../_jest-setup_/utils/server-setup");

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(schema);

let server;

beforeAll(async () => {
  server = await setupServer();
});

afterAll(async () => {
  await teardownServer();
});

describe("tests for project api", () => {
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

  // GET for all projects
  it("should get all projects(GET Request)", async () => {
    const res = await request(server).get("/api/projects");
    // .set("Authorization", `Bearer ${userToken}`);
    console.log("res.body", res.body);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(project => {
      const valid = validate(project);
      if (!valid) {
        console.log(validate.errors);
      }
      expect(valid).toBe(true);
    });
  });

  // GET archived projects
  it("should get all archived projects(GET Request)", async () => {
    const res = await request(server)
      .get("/api/projects/archivedprojects")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(Array.isArray(res.body)).toBeTruthy();
    res.body.forEach(project => {
      const valid = validate(project);
      if (!valid) {
        console.log(validate.errors);
      }
      expect(valid).toBe(true);
    });
  });

  // GET for project by id
  it("should get project by id(GET Request)", async () => {
    const res = await request(server)
      .get("/api/projects/1")
      .set("Authorization", `Bearer ${userToken}`);
    expect(Array.isArray(res.body)).toBeFalsy();
    expect(res.statusCode).toEqual(200);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBe(true);
  });

  // POST for project
  it("should allow user to add project(POST request)", async () => {
    const res = await request(server)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "test project",
        address: "test address",
        formInputs: "test formInputs",
        loginId: 1,
        calculationId: 1,
        description: "test description",
        firstName: "test firstName",
        lastName: "test lastName"
      });
    expect(res.statusCode).toEqual(201);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBe(true);
  });

  // PUT for project
  it("should allow user to update project(PUT request)", async () => {
    const res = await request(server)
      .put("/api/projects/1")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        id: 1,
        name: "test project",
        address: "test address",
        formInputs: "test formInputs",
        loginId: 1,
        calculationId: 1,
        description: "test description",
        firstName: "test firstName",
        lastName: "test lastName"
      });
    expect(res.statusCode).toEqual(200);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBe(true);
  });

  // PUT for project hide
  it("should allow user to hide project(PUT request)", async () => {
    const res = await request(server)
      .put("/api/projects/hide")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        ids: [1], // send an array of ids
        hide: true,
        loginId: 123 // replace with actual loginId
      });
    expect(res.statusCode).toEqual(200);

    const valid = validate(res.body);
    if (!valid) {
      console.log(validate.errors);
    }
    expect(valid).toBe(true);
  });

  // PUT for project trash
  it("should allow user to trash project(PUT request)", async () => {
    const res = await request(server)
      .put("/api/projects/trash")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        ids: [1], // send an array of ids
        trash: true,
        loginId: 123 // replace with actual loginId
      });
    expect(res.statusCode).toEqual(200);
  });

  // PUT for project snapshot
  it("should allow user to snapshot project(PUT request)", async () => {
    const res = await request(server)
      .put("/api/projects/snapshot")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        id: 1,
        loginId: 123, // replace with actual loginId
        name: "Test Snapshot" // replace with actual snapshot name
      });
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });

  // PUT for project renameSnapshot
  it("should allow user to renameSnapshot project(PUT request)", async () => {
    const res = await request(server)
      .put("/api/projects/renameSnapshot")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        id: 1,
        loginId: 123, // replace with actual loginId
        name: "test snapshot"
      });
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
  });

  // DELETE for project
  it("should allow user to delete project(DELETE request)", async () => {
    const res = await request(server)
      .delete("/api/projects/1")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("Project deleted successfully");
  });
});
