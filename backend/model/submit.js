import submitSchema from "../schema/submit.js";
import mongoose from "mongoose";
import { DateTime } from "luxon";

export const Submission = mongoose.model("Submission", submitSchema);

Submission.createIndexes(
  { username: 1, question: 1, submitDate: 1 },
  { unqiue: true }
);

// Submission.create

export const queryByUserNameAndDate = async (username, date) => {
  try {
    const submissions = await Submission.find({ date, username }, "-name", {
      lean: true,
    });
    return submissions;
  } catch (error) {
    console.error("Error searching for documents:", error);
    return [];
  }
};

// export const insertSubmission = async (username, problem, date) => {
//   try {
//     const newSubmission = new Submission({ username, problem, date });
//     const savedSubmission = await newSubmission.save();
//     return savedSubmission;
//   } catch (error) {
//     // Handle the error in case of duplicate key violation
//     if (error.code != 11000) {
//       console.error("Error inserting submission:", error);
//       throw error; // Handle other errors appropriately in your application
//     }
//   }
// };

export const insertSubmissionList = async (submissions) => {
  // Use the 'insertMany()' method to insert the array of objects
  Submission.insertMany([...submissions], {
    ordered: false,
  })
    .then((insertedSubmissions) => {
      console.log("Inserted submissions:", insertedSubmissions);
    })
    .catch((error) => {
      if (error.name === "MongoError" && error.code != 11000) {
        // Duplicate username
        // return res.status(422).send({ succes: false, message: 'User already exist!' });
        console.error("Error inserting submissions:", error);
      }
    });
};

export const queryByToday = async () => {
  const now = DateTime.now();
  const date = now.toLocaleString(DateTime.DATE_SHORT);
  Submission.find({ submitDate: date })
    .lean()
    .then((result) => {
      // console.log("Find submissions: ", result);
      return result;
    })
    .catch((error) => {
      console.error("Error inserting submissions:", error);
    });
  // try {
  //   const now = DateTime.now();
  //   const date = now.toLocaleString(DateTime.DATE_SHORT);
  //   // console.log(date);
  //   // const submissions = [];
  //   const submissions = await Submission.find({ "submitDate": date}).lean();
  //   return submissions;
  // } catch (error) {
  //   console.error("Error searching for documents:", error);
  //   return [];
  // }
};
