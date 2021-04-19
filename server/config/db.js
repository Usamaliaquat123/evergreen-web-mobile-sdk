// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017/evergreen';

// MongoClient.connect(url, (err, db) => {
//   if (err) throw err;
//   console.log('Database created!');
//   db.close();
// });

// Import the mongoose module
const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/evergreen';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
