// const mongoose = require("mongoose");
import mongoose from "mongoose";
import userSchema from "../schema/user.js";

// Create the User model using the userSchema
export const User = mongoose.model("User", userSchema);

export const users = ["xl3781", "dongyuqi", "gj_entertain", "emzhangfan"];

// Query to get all users
export const getAllUsers = async () => {
  let results = await User.find({})
    .lean()
    .catch((error) => {
      console.error("Error getting users:", error);
    });
  return results;
};

export const insertUser = async (username) => {
  try {
    // Create a new user document using the User model
    const newUser = new User({
      username,
    });
    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log("User inserted:", savedUser);
    return savedUser;
  } catch (error) {
    console.error("Error inserting user:", error);
  }
};

// Export the User model
// module.exports = { User, getAllUsers, insertUser};
