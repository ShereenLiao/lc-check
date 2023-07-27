import mongoose from "mongoose";

const submitSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  question: {
    type: String,
    require: true,
  },
  submitDate: {
    type: String,
    require: true,
  },
  submitTime: {
    type: String,
    require: true,
  },
});

submitSchema.index(
  { username: 1, question: 1, submitDate: 1 },
  { unique: true }
);


export default submitSchema;
