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

const connectionStr = `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`;

connectDB(connectionStr);

// Store mongoose connection in app locals
app.set('mongoose', mongoose.connection);

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

app.get('/api/todos', (req, res) => {
  const db = req.app.get('mongoose');
  const filter = req.params || {};

  const result = db.collection('todos').find(filter).toArray();

  res.status(200).send(Array.from(result));
});

app.post('/api/todo', (req, res) => {
  const db = req.app.get('mongoose');
  const payload = req.body;
  const todo = {
    id: uuidV4(),
    ...payload,
  };

  const result = db.collection('todos').insertOne(todo);
  if (result.insertedCount === 1) {
    res.status(200).send(todo);
  } else {
    res.status(500).send({ message: 'Error creating todo!' });
  }
});

app.put('/api/todo/:id', (req, res) => {
  const db = req.app.get('mongoose');
  const todoId = req.params.id;
  const payload = req.body;

  const result = db
    .collection('todos')
    .updateOne({ id: todoId }, { $set: payload });
  if (result.modifiedCount === 1) {
    res.status(200).send({ message: 'Todo updated successfully!' });
  } else {
    res.status(500).send({ message: 'Error updating todo!' });
  }
});

app.delete('/api/todo/:id', (req, res) => {
  const db = req.app.get('mongoose');
  const todoId = req.params.id;

  const result = db.collection('todos').deleteOne({ id: todoId });
  if (result.deletedCount === 1) {
    res.status(200).send({ message: 'Todo deleted successfully!' });
  } else {
    res.status(500).send({ message: 'Error deleting todo!' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
