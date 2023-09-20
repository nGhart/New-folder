const mongoose = require('mongoose');
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectToDb;
