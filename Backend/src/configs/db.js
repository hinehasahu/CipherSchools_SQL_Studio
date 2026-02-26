const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("Error connecting to MongoDB.");
    console.log(Error);
  }
};

module.exports = ConnectDB;
