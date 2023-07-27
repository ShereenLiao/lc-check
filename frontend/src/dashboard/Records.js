import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { getTodayQuestion } from "../utils/questionUtils";

import {v4} from 'uuid';

const target = 4;

export default function Records(props) {
  const [submits, setSubmits] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5050/records', {
      method:"get",
      headers: {
        "Content-Type": "application/json"
   }})
    .then(response => response.json())
    .then(async (data) => {
      const questions = await getTodayQuestion();
      // console.log(questions);
      data.forEach(element => {
        const submits = element.data;
        // const username = element.username;
        // console.log(`=========${username}=======`);
        // console.log(submits);
        // console.log(questions);
        var count = 0;
        submits.forEach((s) => {
          questions.forEach((q) => { 
            if(s.question === q.Name){
              // console.log("+1");
              count++;
            }
            // console.log(s.question, q.Name);
          })});
        element["status"] = `${count}/${target}`;
      });
      setSubmits(data);
      // console.log(data);
    }).catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submits.map((row) => (
            <TableRow key={v4()}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
