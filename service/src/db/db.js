import mongoose from "mongoose";
import config from "../config";

const DB_URL = config.dbUrl;

mongoose.connect(DB_URL);

mongoose.connection.on("connected", function () {
  console.log("Mongoose connection open to " + DB_URL);
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

module.exports = mongoose;
