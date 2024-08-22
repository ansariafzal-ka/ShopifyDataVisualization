const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "RQ_Analytics",
    });
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log("Error connecting to MongoDb : ", error);
  }
};

module.exports = connectDb;
