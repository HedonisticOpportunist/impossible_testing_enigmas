jest.setTimeout(10000); // Apply timeout for all tests.
const request = require("supertest");
const app = require("../src/server");

describe("(Mock) ReqRes NON-GET API Tests", () => {
  test("should return 200 when a user has been registered successfully", async () => {
    // ARRANGE
    const payload = { email: "sydney@fife", password: "pistol" };

    // ACT
    const response = await request(app)
      .post("/api/register")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 4);
    expect(response.body).toHaveProperty("token", "QpwL5tke4Pnpja7X4");
  });

  // No GET equivalent for this test, as created/updated values will not be returned from a GET
  // request in ReqRes.
  test("should return 400 when no password has been provided for the registration", async () => {
    // ARRANGE
    const payload = { email: "sydney@fife" };

    // ACT
    const response = await request(app)
      .post("/api/register")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Missing password");
  });

  test("should return 200 when a user has been logged in successfully", async () => {
    // ARRANGE
    const payload = { email: "eve.holt@reqres.in", password: "cityslicka" };

    // ACT
    const response = await request(app)
      .post("/api/login")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token", "QpwL5tke4Pnpja7X4");
  });

  // No GET equivalent for this test, as created/updated values will not be returned from a GET
  // request in ReqRes.

  test("should return 400 when a user has not provided a password for the login", async () => {
    // ARRANGE
    const payload = { email: "eve.holt@reqres.in" };

    // ACT
    const response = await request(app)
      .post("/api/login")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Missing password");
  });

  test("should return 200 when a record has been created successfully", async () => {
    // ARRANGE
    const payload = { name: "morpheus", job: "leader" };

    // ACT
    const response = await request(app)
      .post("/api/users")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "morpheus");
    expect(response.body).toHaveProperty("job", "leader");

    expect(response.body).toHaveProperty("id", "496");
    expect(response.body).toHaveProperty(
      "createdAt",
      "2024-07-01T10:00:00.000Z",
    );
  });

  // No GET equivalent for this test, as created/updated values will not be returned from a GET
  // request in ReqRes.

  test("should return 200 when a user has been updated successfully via a PUT request", async () => {
    // ARRANGE
    const payload = { name: "morpheus", job: "zion resident" };

    // ACT
    const response = await request(app)
      .put("/api/users/2")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "morpheus");
    expect(response.body).toHaveProperty("job", "zion resident");
    expect(response.body).toHaveProperty(
      "updatedAt",
      "2024-07-01T10:00:00.000Z",
    );
  });

  // No GET equivalent for this test, as created/updated values will not be returned from a GET
  // request in ReqRes.

  test("should return 200 when a user has been updated successfully via a PATCH request", async () => {
    // ARRANGE
    const payload = { job: "zion resident" }; // We are only interested in updating the job.

    // ACT
    const response = await request(app)
      .patch("/api/users/2")
      .send(payload)
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "morpheus");
    expect(response.body).toHaveProperty("job", "zion resident");
    expect(response.body).toHaveProperty(
      "updatedAt",
      "2024-07-01T10:00:00.000Z",
    );
  });

  // No GET equivalent for this test, as created/updated values will not be returned from a GET
  // request in ReqRes.

  test("should return 200 when a user has deleted", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .delete("/api/users/2")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  // No GET equivalent for this test, as created/updated values will not be returned from a GET
  // request in ReqRes.
});
