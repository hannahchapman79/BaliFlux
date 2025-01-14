const request = require("supertest");
const db = require("../../db/connection")
const seed = require("../../db/seeds/seed")
const data = require("../../db/data")
const app = require("../../app")
const endpoints = require("../../endpoints.json")

jest.mock("../../middleware/jwtAuth", () => (request, response, next) => next());

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api", () => {
  test("responds with a json detailing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

describe("/api/users", () => {
  describe("POST", () => {
    test("201: Adds a user to the database", () => {
      const newUser = {
        username: "emilyy",
        password: "football02",
        email: "emilysmith@outlook.com",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          const { user } = body;
          expect(Object.keys(user)).toHaveLength(3);
          expect(user.username).toBe("emilyy");
          expect(user.email).toBe("emilysmith@outlook.com");
        });
    });
    test("400: Responds with bad request when a username already exists", () => {
      const newUser = {
        username: "grumpycat",
        password: "Goodbye01",
        email: "grumpycat1@gmail.com",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Username already exists");
        });
    });
    test("400: Responds with bad request when an email already exists", () => {
      const newUser = {
        username: "katie09",
        password: "Nature1234",
        email: "jess@gmail.com",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Email already exists");
        });
    });
    test("400: Responds with bad request when the username and password already exists", () => {
      const newUser = {
        username: "travelforever",
        password: "travelforever",
        email: "jess@gmail.com",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("User already exists");
        });
    });
    test("400: Responds with bad request when required fields are missing", () => {
      const newUser = {
        username: "wildlife9",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe(
            "All fields are required (username, password, email)"
          );
        });
    });
    test("400: Responds with bad request when email format is invalid", () => {
      const newUser = {
        username: "wildlife9",
        password: "Nature123",
        email: "invalid-email-format",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Invalid email format");
        });
    });
    test("400: Responds with bad request when password is too short", () => {
      const newUser = {
        username: "wildlife9",
        password: "123",
        email: "explorethewild@outlook.com",
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .then(({ body }) => {
          const { message } = body;
          expect(message).toBe("Password must be at least 8 characters long");
        });
    });
  })
  describe("GET", () => {
    test("200: Responds with a list of all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          expect(response.body.users.length).toBe(5);
          response.body.users.forEach((user) => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.email).toBe("string");
            expect(user).toHaveProperty("user_id");
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("email");
          });
        });
    });
    test("404: Responds with path not found for a non-existent endpoint", () => {
      return request(app)
        .get("/api/nonexistent")
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe("path not found");
        });
    });
    test("200: Users list does not include passwords", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          response.body.users.forEach((user) => {
            expect(user).not.toHaveProperty("password");
          });
        });
    });
    test("200: Responds with the user object when the username exists", () => {
      return request(app)
        .get("/api/users/katie07")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual({
            user_id: expect.any(Number),
            username: "katie07",
            email: "katiep@gmail.com",
          });
        });
    });
    test("404: Responds with 'User not found' when the username does not exist", () => {
      return request(app)
        .get("/api/users/nonexistentuser")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("User not found");
        });
    });
  });
  describe("DELETE", () => {
    test("404: Responds with 'user does not exist'when the given user id doesn't exist in the database", () => {
      return request(app)
        .delete("/api/users/800")
        .expect(404)
        .then((response) => {
          expect(response.body.message).toEqual("user does not exist");
        });
    });
    test("400: Responds with bad request when the given an invalid user id", () => {
      return request(app)
        .delete("/api/users/not-a-number")
        .expect(400)
        .then((response) => {
          expect(response.body.message).toEqual("invalid id type");
        });
    });
  });
})