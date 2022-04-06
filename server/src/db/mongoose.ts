import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();
(async function () {
  try {
    const MONGO_URL = process.env.MONGO_URL as string;

    await mongoose.connect(MONGO_URL);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
})();
