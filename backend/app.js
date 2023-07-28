import express from "express";
import connectToMongoDB from "./utils/mongodb.js";
import cors from "cors";
import start_crawl from "./bg-crawler/crawler.js";
import { Submission } from "./model/submit.js";
import { DateTime } from "luxon";
import { users } from "./model/user.js";

const app = express();
const PORT = process.env.PORT || 5050;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());

await connectToMongoDB();

setInterval(start_crawl, 5 * 60 * 1000); //每隔5分钟调用myFunction函数

app.get("/records", async (req, res) => {
  const now = DateTime.now();
  const date = now.toLocaleString(DateTime.DATE_SHORT);
  const submits = [];
  for (const user of users) {
    const data = await Submission.find({
      submitDate: date,
      username: user,
    }).lean();

    const submit = {
      username: user,
      data,
      date,
      total: data.length,
    };
    submits.push(submit);
  }
  submits.sort((s1, s2) => s2.data.length - s1.data.length);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.send(submits);
});

app.listen(PORT, () => {
  console.log(`Application started and Listening on port ${PORT}`);
});
