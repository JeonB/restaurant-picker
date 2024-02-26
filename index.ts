// TODO: convert JS to TS

// import fastify
const fastify = require("fastify");
// import mongoose
const mongoose = require("mongoose");
const User = require("./User");
const app = fastify();
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/users";
/** connect to MongoDB datastore */
try {
  mongoose.connect(mongoUrl);
} catch (error) {
  console.error(error);
}
// Set a GET route "/"
app.get("/", function (request, reply) {
  reply.send("Our first route");
});
// Get all users
app.get("/api/users", async (request, reply) => {
  try {
    const users = await User.find({});
    reply.send(users);
  } catch (err) {
    reply.send({ error: err.message });
  }
});

// Get user by ID
app.get("/api/users/:userId", async (request, reply) => {
  try {
    const userId = request.params.userId;
    const user = await User.findById(userId);
    reply.send(user);
  } catch (err) {
    reply.send({ error: err.message });
  }
});

// Create a new user
app.post("/api/users", async (request, reply) => {
  try {
    const user = request.body;
    const newUser = await User.create(user);
    reply.send(newUser);
  } catch (err) {
    reply.send({ error: err.message });
  }
});

// Update user by ID
app.put("/api/users/:userId", async (request, reply) => {
  try {
    const userId = request.params.userId;
    const newUserEdit = request.body;
    const user = await User.findById(userId);
    user.age = newUserEdit.age;
    user.name = newUserEdit.name;
    user.email = newUserEdit.email;
    const savedUser = await user.save();
    reply.send(savedUser);
  } catch (err) {
    reply.send({ error: err.message });
  }
});

// Delete user by ID
app.delete("/api/users/:userId", async (request, reply) => {
  try {
    const userId = request.params.userId;
    const user = await User.findById(userId);
    console.log(user);
    await user.deleteOne();
    reply.send("USER DELETED");
  } catch (err) {
    reply.send({ error: err.message });
  }
});

// Start the server
app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
