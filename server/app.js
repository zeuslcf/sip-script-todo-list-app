const dotenv = require("dotenv");
const uuidV4 = require("uuid").v4;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();
const port = 8000;

// Middleware to handle Cross Origin Resource Sharing
app.use(cors());

const connectionStr = `${process.env.TWIN_DB_CONNECTION_STRING}/${process.env.TWIN_DB_NAME}`;

mongoose
  .connect(connectionStr)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware to attach mongoose instance to req object
app.use((req, res, next) => {
  req.mongoose = mongoose.connection;
  next();
});

app.get("/api", async (req, res) => {
  const db = req.mongoose;
  const todos = await db.collection("todos").find({}).toArray();
  console.log("-----", todos);
  res.send({
    message: "Welcome: Todo API",
  });
});

// Example route to demonstrate accessing mongoose instance
app.get("/example", (req, res) => {
  const db = req.mongoose;
  res.send("Mongoose instance accessed");
});

app.get("/api/todos", (req, res) => {
  const db = req.mongoose;
  const filter = req.params || {};

  db.collection("todos")
    .find(filter)
    .toArray((err, result) => {
      if (err) {
        return res.status(500).send("Error fetching todos");
      }
      res.send(result);
    });
});

app.post("/api/todo", (req, res) => {
  const db = req.mongoose;
  const payload = req.body;
  const obj = {
    id: uuidV4(),
    ...payload,
  };

  db.collection("todos").insertOne(obj, (err, result) => {
    if (err) {
      return res.status(500).send("Error inserting todo");
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
