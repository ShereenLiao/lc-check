import * as React from 'react';
import Title from './Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {v4} from 'uuid';
import { getTodayQuestion } from '../utils/questionUtils';

export default function DailyTask() {
  const [questions, setQuestions] = React.useState([]);
 
  React.useEffect(() => {
    const questions = getTodayQuestion();
    console.log(questions);
    setQuestions(questions);
    // getTodayQuestion().then((data) => {
    //   console.log(data);
    //   setQuestions(data);
    // })
    }, [])

  return (
    <React.Fragment>
      <Title>Today Task</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>No.</TableCell> */}
            <TableCell>Tag</TableCell>
            <TableCell>Title</TableCell>
            {/* <TableCell>Link</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
            {/* <TableRow> */}
            {questions.map((q) => (
            <TableRow key={v4()}>
              <TableCell>{q.Category}</TableCell>
              {/* <TableCell>{q.Name}</TableCell> */}
              <TableCell><a href = {q.Link}>{q.Name}</a></TableCell>
            </TableRow>
          ))}
              {/* <TableCell style={{width:50}}>111</TableCell> 
              {<TableCell align="left">2222</TableCell>
              <TableCell style={{width:200}}>Sliding Window</TableCell> */}
            {/* </TableRow> */}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
