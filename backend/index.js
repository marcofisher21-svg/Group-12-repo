// index.js
import express from 'express';
import {
  getEmployees,
  postEmployee,
  patchEmployee,
  deleteEmployee
} from './controllers/employeeController.js';

import { patchAttendance } from './models/attendanceModel.js';
import { deleteAttendance, getAttendance, postAttendance } from './controllers/attendanceController.js';

const app = express();
app.use(express.json());

app.get('/employee', getEmployees);
app.post('/employee', postEmployee);
app.patch('/employee/:employeeId', patchEmployee);
app.delete('/employee/:employeeId', deleteEmployee);

app.get('/attendance ', getAttendance);
app.post('/attendance', postAttendance);
app.patch('/attendance', patchAttendance);
app.delete('/attendance', deleteAttendance);

app.listen(2006, () => {
  console.log('http://localhost:2006');
});
