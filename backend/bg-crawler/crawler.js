import axios from "axios";
import cheerio from "cheerio";
import { DateTime } from "luxon";
import { insertSubmissionList } from "../model/submit.js";
import { users } from "../model/user.js";

const base_url = "https://leetcode.com/";

export default async function start_crawl() {
  for (const element of users) {
    crawl(element.username).then((submits) => {
      insertSubmissionList(submits);
    });
  }
}

async function crawl(username = "xl3781") {
  const url = base_url + username;
  const pageHTML = await axios.get(url);
  const $ = cheerio.load(pageHTML.data);
  let data = [];
  let submits = [];
  $("a div span").each((index, element) => {
    const text = $(element).contents().first().text();
    data.push(text);
  });
  for (let i = 0; i < data.length; i = i + 2) {
    const time = data[i + 1];
    const question = data[i];

    const { submitTime, submitDate, isSameDay } = computeTime2(time);
    if (isSameDay) {
      const submit = { question, username, submitTime, submitDate };
      submits.push(submit);
    }
  }
  return submits;
}

const isSubmitToday = (time) => {
  const timeStr = new String(time);
  const timeLargerThanDay = ["day", "month", "year", "days", "months", "years"];

  if (checkStringContainsAny(timeStr, timeLargerThanDay)) {
    return { isSameDay: false, submitTime: null };
  }

  const { submitTime, isSameDay } = computeTime(time);

  if (isSameDay === false) {
    return { isSameDay: false, submitTime: null };
  }

  return { submitTime, isSameDay };
};

const checkStringContainsAny = (inputString, arrayOfStrings) => {
  for (const str of arrayOfStrings) {
    if (inputString.includes(str)) {
      return true;
    }
  }
  return false;
};

const computeTime = (time) => {
  const timeWords = time.split(" ");

  var submitTime = DateTime.now();

  let seconds = 0; //ignore right now
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let years = 0;
  let months = 0;

  if (time.includes("months")) {
    months = 0;
  } else if (time.includes("month")) {
    months = 1;
  }
  if (time.includes("days")) {
    days = parseInt(timeWords[0]);
  } else if (time.includes("day")) {
    days = 1;
  } else if (time.includes("years")) {
    years = parseInt(timeWords[0]);
  } else if (time.includes("year")) {
    years = 1;
  } else if (time.includes("minutes")) {
    //a few minutes before
    console.log("a few minutes before " + timeWords[0]);
    minutes = parseInt(timeWords[0]);
  } else if (time.includes("minute")) {
    //one minute before
    minutes = 1;
  } else if (time.includes("hours")) {
    //a few hours before
    hours = parseInt(timeWords[0]);
  } else if (time.includes("hour")) {
    //one hour before
    hours = 1;
  }

  let submit = submitTime.minus({ years, months, days, hours, minutes });
  const now = DateTime.now();

  console.log(submit.toFormat("f") + " now is " + now.toFormat("f"));

  if (now.hasSame(submit, "day")) {
    return { isSameDay: true, submitTime: submit.toFormat("f") };
  }
  return { isSameDay: false, submitTime: submit.toFormat("f") };
};

const computeTime2 = (time) => {
  var submitTime = DateTime.now();
  let minute = 0;
  let hour = 0;
  let day = 0;
  let year = 0;
  let month = 0;
  // let time = "3 minutes ago";
  const timeWords = time.split(" ");
  let list = { minute, hour, day, year, month };

  for (let i in list) {
    if (time.includes(`${i}`)) {
      if (time.includes(`${i}s`) === true) {
        list[i] = parseInt(timeWords[0]);
      } else {
        list[i] = 1;
      }
    }
  }
  let submit = submitTime.minus({
    hours: list.hour,
    minutes: list.minute,
    years: list.year,
    days: list.day,
    months: list.month,
  });
  const now = DateTime.now();

  if (now.hasSame(submit, "day")) {
    return {
      isSameDay: true,
      submitDate: submit.toLocaleString(DateTime.DATE_SHORT),
      submitTime: submit.toLocaleString(DateTime.TIME_SIMPLE),
    };
  }
  return {
    isSameDay: false,
    submitDate: submit.toLocaleString(DateTime.DATE_SHORT),
    submitTime: submit.toLocaleString(DateTime.TIME_SIMPLE),
  };
};
