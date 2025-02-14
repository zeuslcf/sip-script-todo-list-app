const dotenv = require('dotenv');
const uuidV4 = require('uuid').v4;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();
const app = express();
const port = 8000;

// Middleware to handle Cross Origin Resource Sharing
app.use(cors());
app.use(express.json());

app.get('/api', async (req, res) => {
  res.status(200).send({
    message: 'Welcome: Todo API',
  });
});

app.get('/ready', (req, res) => {
  res.status(200).send({
    ready: true,
  });
});

app.get('/api/todos', async (req, res) => {
  const db = req.app.get('mongoose');
  const filter = req.params || {};

  const result = await db.collection('todos').find(filter).toArray();

  res.status(200).send(Array.from(result));
});

app.post('/api/todo', async (req, res) => {
  const db = req.app.get('mongoose');
  const payload = req.body;
  const todo = {
    id: uuidV4(),
    ...payload,
  };

  const result = await db.collection('todos').insertOne(todo);
  if (result.acknowledged) {
    res.status(200).send(todo);
  } else {
    res.status(500).send({ message: 'Error creating todo!' });
  }
});

app.put('/api/todo/:id', async (req, res) => {
  const db = req.app.get('mongoose');
  const todoId = req.params.id;
  const isComplete = req.body;

  const result = await db
    .collection('todos')
    .updateOne({ id: todoId }, { $set: isComplete });
  if (result.modifiedCount === 1) {
    res.status(200).send({ message: 'Todo updated successfully!' });
  } else {
    res.status(500).send({ message: 'Error updating todo!' });
  }
});

app.delete('/api/todo/:id', async (req, res) => {
  const db = req.app.get('mongoose');
  const todoId = req.params.id;

  const result = await db.collection('todos').deleteOne({ id: todoId });
  if (result.deletedCount === 1) {
    res.status(200).send({ message: 'Todo deleted successfully!' });
  } else {
    res.status(500).send({ message: 'Error deleting todo!' });
  }
});

const init = async () => {
  const connectionStr = `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`;
  await connectDB(connectionStr)
    // Store mongoose connection in app locals
    .then((_) => app.set('mongoose', mongoose.connection));
};

app.listen(port, async () => {
  await init();
  console.log(`Example app listening at http://localhost:${port}`);
});
