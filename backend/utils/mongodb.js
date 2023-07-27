// const mongoose = require('mongoose');
import mongoose from "mongoose";

// Import the dotenv package
import dotenv from "dotenv";

// Load the environment variables from .env into process.env
dotenv.config();

const db_user = process.env.MONGODB_USERNAME;
const db_password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://${db_user}:${db_password}@cluster0.tdxy5.mongodb.net/leetcode?retryWrites=true&w=majority`;

export default async function connectToMongoDB() {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
}
