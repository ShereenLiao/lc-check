import mongoose from "mongoose";
// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // The username is required for each user document
    unique: true, // The username must be unique, no two users can have the same username
  },
});

export default userSchema;
