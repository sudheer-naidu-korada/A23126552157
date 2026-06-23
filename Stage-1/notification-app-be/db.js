//This is a file that is used to connect to the MongoDB Database... Basic Error Handling has been used

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Online");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;