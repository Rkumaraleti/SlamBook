const request = require("supertest");
const app = require("../index"); // Import your Express app
const mongoose = require("mongoose");
const SlamCard = require("../models");
const UserModel = require("../models/userModel");

describe("Slam Routes", () => {
  let token;
  let userId;
  let slamId;

  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test user and generate a JWT token
    const user = await UserModel.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword", // Use a hashed password
    });
    userId = user._id;

    token = "Bearer <valid-jwt-token>"; // Replace with a valid JWT token
  });

  afterAll(async () => {
    // Clean up the database and close the connection
    await SlamCard.deleteMany({});
    await UserModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("should create a new slam", async () => {
    const res = await request(app)
      .post("/createslam")
      .set("Authorization", token)
      .send({
        slamName: "My Slam",
        formFields: [{ question: "What is your favorite color?" }],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Slam created successfully");
    slamId = res.body.slam._id; // Save the created slam ID for later tests
  });

  it("should edit an existing slam", async () => {
    const res = await request(app)
      .post(`/slam/${slamId}/editslam`)
      .set("Authorization", token)
      .send({
        slamName: "Updated Slam",
        formFields: [{ question: "What is your favorite food?" }],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Slam Updated Successfully");
  });

  it("should delete an existing slam", async () => {
    const res = await request(app)
      .delete(`/slam/${slamId}`)
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Slam Deleted Successfully");
  });
});