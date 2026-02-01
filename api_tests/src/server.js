// src/server.js

/* 
  It was necessary to mock, as the original server is blocked 
  by Cloudflare and cannot be accessed directly in Austria. Not all of the data 
  from the original API is mocked here, only what feels necessary to pass the tests. 

  (And yes, I know this file is large. I am so sorry.)
*/

const express = require("express");
const app = express();
app.use(express.json());

// * GET ENDPOINTS *

// MOCK the /api/users?page=2 endpoint.
app.get("/api/users", (req, res) => {
  if (req.query.page === "2") {
    return res.status(200).json({
      page: 2,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 7,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
      ],
    });
  }
});

// Mock GET the /api/users/2 endpoint.
app.get("/api/users/2", (_req, res) => {
  res.status(200).json({
    data: {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
  });
});

// Mock GET /api/users/23 endpoint.
app.get("/api/users/23", (_req, res) => {
  res.status(404).json({});
});

// Mock GET /api/unknown endpoint.
app.get("/api/unknown", (_req, res) => {
  res.status(200).json({
    page: 1,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: [
      {
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D9",
        pantone_value: "15-4020",
      },
    ],
  });
});

// Mock GET /api/unknown/2 endpoint.
app.get("/api/unknown/2", (_req, res) => {
  res.status(200).json({
    data: {
      id: 2,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375",
      pantone_value: "17-2031",
    },
  });
});

// Mock /api/unknown/23 endpoint (use case for delay).
app.get("/api/unknown/23", (_req, res) => {
  res.status(404).json({});
});

// Mock /api/users?delay=3 endpoint.
app.get("/api/users", (req, res) => {
  if (req.query.delay === "3") {
    res.status(200).json({
      data: [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          first_name: "George",
          last_name: "Bluth",
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
      ],
    });
  }
});

/* PUSH ENDPOINTS */

// Mock api/register endpoint.
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!password) {
    return res.status(400).json({
      error: "Missing password",
    });
  }

  res.status(200).json({
    id: 4,
    token: "QpwL5tke4Pnpja7X4",
  });
});

// MOCK /api/login endpoint.
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Missing password",
    });
  }

  res.status(200).json({
    token: "QpwL5tke4Pnpja7X4",
  });
});

// MOCK /api/users endpoint.
app.post("/api/users", (req, res) => {
  const { name, job } = req.body;

  res.status(201).json({
    name: "morpheus",
    job: "leader",
    id: "496",
    createdAt: "2024-07-01T10:00:00.000Z",
  });
});

/* PUT ENDPOINTS */

// Mock /api/users/2 endpoint (PUT).
// Interestingly, PUT rewrites the entire resource (i.e. overwrites or sends the whole object).
app.put("/api/users/:id", (_req, res) => {
  res.status(200).json({
    name: "morpheus",
    job: "zion resident",
    updatedAt: "2024-07-01T10:00:00.000Z",
  });
});

/* PATCH ENDPOINTS */

// Mock /api/users/2 endpoint (PATCH).
// By contrast, PATCH only edits the fields you specify.
app.patch("/api/users/:id", (_req, res) => {
  res.status(200).json({
    name: "morpheus",
    job: "zion resident",
    updatedAt: "2024-07-01T10:00:00.000Z",
  });
});

/* DELETE ENDPOINTS */
app.delete("/api/users/:id", (_req, res) => {
  res.status(204).send();
});

module.exports = app; // Export the app for testing purposes.
