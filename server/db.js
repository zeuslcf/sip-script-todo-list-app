const mongoose = require('mongoose');

function connectDB(connectionStr) {
  try {
    mongoose.connect(connectionStr);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', (_) => {
    console.log(`Database connected: ${connectionStr}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}

module.exports = connectDB;
