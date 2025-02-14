const mongoose = require('mongoose');

async function connectDB(connectionStr) {
  console.log(`Connecting to database: ${connectionStr}`);
  try {
    await mongoose
      .connect(connectionStr)
      .then(() => console.log(`Database connected: ${connectionStr}`))
      .catch((err) => console.error(`connection error: ${err}`));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
