// index.js
import express from 'express';
import cors from 'cors'; 
import {
  getEmployees,
  postEmployee,
  patchEmployee,
  deleteEmployee
} from './controllers/employeeController.js';

import { deleteAttendance, getAttendance, postAttendance , patchAttendance} from './controllers/attendanceController.js';

import { getLeave, postLeave, patchLeave, deleteLeave} from './controllers/leaveController.js';

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/employee', getEmployees);
app.post('/employee', postEmployee);
app.patch('/employee/:employeeId', patchEmployee);
app.delete('/employee/:employeeId', deleteEmployee);

app.get('/attendance', getAttendance);
app.post('/attendance', postAttendance);
app.patch('/attendance/:attendancedID', patchAttendance);
app.delete('/attendance/:attendancedID', deleteAttendance);

app.get('/leave', getLeave);
app.post('/leave',postLeave);
app.patch('/leave/:leaveRequest_ID',patchLeave);
app.delete('/leave/:leaveRequest_ID',deleteLeave);

app.listen(2006, () => {
  console.log('http://localhost:2006');
});
