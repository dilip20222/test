const mongoose = require("mongoose");
const { options } = require("../routes/routes");
require('dotenv').config();

let dbUrl = process.env.DB;

const db = async() => {
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  try {
    await mongoose
      .connect(dbUrl, options)
      .then(() => {
        console.log("DB Connected");
      })
      .catch((error) => console.log("Error", error));
  } catch (error) {
    throw error;
  }
};

module.exports = db;
