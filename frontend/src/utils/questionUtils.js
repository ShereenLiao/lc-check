import { DateTime } from "luxon";
import Papa from 'papaparse';
import NeetCode from '../assets/NeetCode.csv';

let count = 4;
const initDate = DateTime.fromISO('2023-07-27');

let questions = [];

export const parseQuestion = () =>{
    return new Promise((resolve, reject) =>
    Papa.parse(NeetCode, {
        download: true,
        header: true, // gives us an array of objects
        dynamicTyping: true,
        complete: function (input) {
            questions = input.data;
        }
    }));
}


export const getTodayQuestion = () => {
  const today = DateTime.now();
  const diff = today.diff(initDate, "days").toObject();
  const days = Math.round(diff.days);

  const startIndex = (days) * count;
  const endIndex = (days + 1) * count;
  return questions.slice(parseInt(startIndex), parseInt(endIndex));;
};
