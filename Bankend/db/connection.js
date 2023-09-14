const mongoose = require('mongoose');
require('dotenv').config(); // Make sure to require dotenv and load .env before using process.env

mongoose.connect(process.env.connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Mongo DB is connected');
  })
  .catch((err) => {
    console.log('Error in connecting MongoDB: ' + err);
  });