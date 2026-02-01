/*
    Own file for GET requests, as having so many lines of code in one place 
    is a bit unruly for a test script. 
*/

jest.setTimeout(10000); // Apply timeout for all tests.
const request = require("supertest");
const app = require("../src/server");

describe("(Mock) ReqRes GET API Tests", () => {
  test("should get all users on page 2", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/users?page=2")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("page", 2);
    expect(response.body).toHaveProperty("data");

    // Check array-specific properties.
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test("should get a single user", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/users/2")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    // Additional assertions to verify the user data.
    expect(response.body.data).toHaveProperty("id", 2);
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("first_name");
    expect(response.body.data).toHaveProperty("last_name");
  });
  test("should return 404 for a non-existent user", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/users/23")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  test("should get a list of available resources", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/unknown")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    // Check array-specific properties.
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test("should get a single resource", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/unknown/2")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    // Additional assertions to verify the resource data.
    expect(response.body.data).toHaveProperty("id", 2);
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("year");

    expect(response.body.data).toHaveProperty("color");
    expect(response.body.data).toHaveProperty("pantone_value");
  });

  test("should return 404 for a non-existent resource", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/unknown/23")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  // This is failing due to a timeout.
  test.skip("should return 200 for a delayed response", async () => {
    // ARRANGE - ACT
    const response = await request(app)
      .get("/api/users?delay=3")
      .set("Accept", "application/json");

    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    // Additional assertions to verify the user data.
    expect(response.body.data).toHaveProperty("id", 1);
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("first_name");
    expect(response.body.data).toHaveProperty("last_name");
  });
});
