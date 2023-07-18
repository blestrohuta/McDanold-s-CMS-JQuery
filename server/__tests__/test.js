const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { decodeToken } = require("../helpers/jwt");
let access_token;

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert(
    "Users",
    require("../data/user.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
  );

  await sequelize.queryInterface.bulkInsert(
    "Categories",
    require("../data/category.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
  );

  await sequelize.queryInterface.bulkInsert(
    "Cuisines",
    require("../data/cuisine.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
  );

  await sequelize.queryInterface.bulkInsert(
    "Customers",
    require("../data/customer.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })
  );
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Cuisines", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Customers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Register POST /customers/register", () => {
  test("Successfully registered", async () => {
    const response = await request(app).post("/customers/register").send({
      email: "customer1@gmail.com",
      password: "customer1",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", expect.any(String));
  });
  test("Email not provided / not entered", async () => {
    const response = await request(app).post("/customers/register").send({
      password: "customer2",
    });
    expect(response.status).toBe(400);
    console.log(response.body.message);
    expect(response.body.message).toBe("email is required");
  });
  test("Password not provided / not entered", async () => {
    const response = await request(app).post("/customers/register").send({
      email: "customer2@gmail.com",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("password is required");
  });
  test("Empty string provided for email", async () => {
    const response = await request(app).post("/customers/register").send({
      email: "",
      password: "customer2",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("email is required");
  });
  test("Empty string provided for password", async () => {
    const response = await request(app).post("/customers/register").send({
      email: "customer2@gmail.com",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("password is required");
  });
  test("Email already registered", async () => {
    const response = await request(app).post("/customers/register").send({
      email: "customer1@gmail.com",
      password: "customer1",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("this email is already registered");
  });
  test("Invalid email format", async () => {
    const response = await request(app).post("/customers/register").send({
      email: "customer2.com",
      password: "customer2",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("email must be email format");
  });
});

describe("Login POST /customers/login", () => {
  test("Successfully logged in", async () => {
    const response = await request(app).post("/customers/login").send({
      email: "customer1@gmail.com",
      password: "customer1",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    access_token = response.body.access_token;
  });
  test("Incorrect password provided", async () => {
    const response = await request(app).post("/customers/login").send({
      email: "customer1@gmail.com",
      password: "pass",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "email or password is invalid"
    );
  });
  test("Email entered is not registered in the database", async () => {
    const response = await request(app).post("/customers/login").send({
      email: "customer99@gmail.com",
      password: "customer1",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "email or password is invalid"
    );
  });
});

describe("GET Cuisines /customers/cuisines", () => {
  test("Successfully obtained the Main Entity without using any query filter parameters", async () => {
    const response = await request(app).get("/customers/cuisines");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("cuisine");
    expect(response.body.cuisine).toBeInstanceOf(Array);
    response.body.cuisine.forEach((el) => {
      expect(el).toHaveProperty("id", expect.any(Number));
      expect(el).toHaveProperty("name", expect.any(String));
      expect(el).toHaveProperty("description", expect.any(String));
      expect(el).toHaveProperty("price", expect.any(Number));
      expect(el).toHaveProperty("imgUrl", expect.any(String));
      expect(el).toHaveProperty("authorId");
      expect(el).toHaveProperty("categoryId");
      expect(el).toHaveProperty("status");
      expect(el).toHaveProperty("createdAt", expect.any(String));
      expect(el).toHaveProperty("updatedAt", expect.any(String));
      expect(el).toHaveProperty("User");
      expect(el).toHaveProperty("Category");
    });
    expect(response.body).toHaveProperty("totalCuisines", expect.any(Number));
  });
  test("Successfully obtained the Main Entity with 1 query filter parameter", async () => {
    const response = await request(app).get(
      "/customers/cuisines?filterBy=burger"
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("cuisine");
    expect(response.body.cuisine).toBeInstanceOf(Array);
    response.body.cuisine.forEach((el) => {
      expect(el).toHaveProperty("id", expect.any(Number));
      expect(el).toHaveProperty("name", expect.any(String));
      expect(el.name).toMatch(/burger/i);
      expect(el).toHaveProperty("description", expect.any(String));
      expect(el).toHaveProperty("price", expect.any(Number));
      expect(el).toHaveProperty("imgUrl", expect.any(String));
      expect(el).toHaveProperty("authorId");
      expect(el).toHaveProperty("categoryId");
      expect(el).toHaveProperty("status");
      expect(el).toHaveProperty("createdAt", expect.any(String));
      expect(el).toHaveProperty("updatedAt", expect.any(String));
      expect(el).toHaveProperty("User");
      expect(el).toHaveProperty("Category");
    });
    expect(response.body).toHaveProperty("totalCuisines", expect.any(Number));
  });
  test("Successfully obtained the Main Entity along with the corresponding length when providing a specific page", async () => {
    const response = await request(app).get("/customers/cuisines?page=1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("cuisine");
    expect(response.body.cuisine).toBeInstanceOf(Array);
    response.body.cuisine.forEach((el) => {
      expect(el).toHaveProperty("id", expect.any(Number));
      expect(el).toHaveProperty("name", expect.any(String));
      expect(el).toHaveProperty("description", expect.any(String));
      expect(el).toHaveProperty("price", expect.any(Number));
      expect(el).toHaveProperty("imgUrl", expect.any(String));
      expect(el).toHaveProperty("authorId");
      expect(el).toHaveProperty("categoryId");
      expect(el).toHaveProperty("status");
      expect(el).toHaveProperty("createdAt", expect.any(String));
      expect(el).toHaveProperty("updatedAt", expect.any(String));
      expect(el).toHaveProperty("User");
      expect(el).toHaveProperty("Category");
    });
    const lengthOfData = response.body.cuisine.length;
    expect(lengthOfData).toBeLessThanOrEqual(9);
    expect(response.body).toHaveProperty("totalCuisines", expect.any(Number));
  });
  test("Successfully obtained 1 Main Entity according to the given id", async () => {
    const response = await request(app).get("/customers/cuisines/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("price", expect.any(Number));
    expect(response.body).toHaveProperty("imgUrl", expect.any(String));
    expect(response.body).toHaveProperty("authorId");
    expect(response.body).toHaveProperty("categoryId");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body).toHaveProperty("User");
    expect(response.body.User).toHaveProperty("id", expect.any(Number));
    expect(response.body.User).toHaveProperty("username", expect.any(String));
    expect(response.body.User).toHaveProperty("email", expect.any(String));
    expect(response.body.User).toHaveProperty("role", expect.any(String));
    expect(response.body.User).toHaveProperty("phoneNumber");
    expect(response.body.User).toHaveProperty("address", expect.any(String));
    expect(response.body.User).toHaveProperty("createdAt", expect.any(String));
    expect(response.body.User).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body).toHaveProperty("Category");
    expect(response.body.Category).toHaveProperty("id", expect.any(Number));
    expect(response.body.Category).toHaveProperty("name", expect.any(String));
    expect(response.body.Category).toHaveProperty(
      "createdAt",
      expect.any(String)
    );
    expect(response.body.Category).toHaveProperty(
      "updatedAt",
      expect.any(String)
    );
  });
  test("Failed to obtain the Main Entity because the given id parameter does not exist in the database or is invalid", async () => {
    const response = await request(app).get("/customers/cuisines/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "data not found");
  });
});

describe("GET and ADD CustomerFavorite customers/favorites", () => {
  test("Successfully obtained a list of bookmarks/favorites according to the logged-in user", async () => {
    await request(app).post("/customers/favorites/1").set({
      access_token,
    });
    const response = await request(app).get("/customers/favorites").set({
      access_token,
    });
    const { id } = decodeToken(access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].CustomerId).toBe(id);
  });
  test(" Successfully added a CustomerFavorite with the corresponding id", async () => {
    const response = await request(app).post("/customers/favorites/2").set({
      access_token,
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("CustomerId", expect.any(Number));
    expect(response.body).toHaveProperty("CuisineId", expect.any(Number));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });
  test("Failed to add a CustomerFavorite because the sent entity id does not exist in the database", async () => {
    const response = await request(app).post("/customers/favorites/999").set({
      access_token,
    });
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "data not found");
  });
  test("Failed to get a list of CustomerFavorite because the user is not logged in.)", async () => {
    const response = await request(app).get("/customers/favorites");
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "unauthenticated");
  });
  test("Failed to get a list of CustomerFavorite because the provided token is invalid (random string)", async () => {
    const response = await request(app).get("/customers/favorites").set({
      access_token: "randomstring",
    });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "unauthenticated");
  });
});
