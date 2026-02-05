// index.js
import express from 'express';
import cors from 'cors'; 

// 🔹 Employee controller functions
import {
    getEmployees,
    getTotalEmployees,
    // postEmployee,
    // patchEmployee,
    // deleteEmployee
} from './controllers/employeeController.js';

//  Attendance controller functions (keep if you need them)
import { deleteAttendance, getAttendance, postAttendance , patchAttendance } from './controllers/attendanceController.js';

import { getLeave,patchLeave,postLeave,deleteLeave } from './controllers/leaveController.js'



const app = express();
app.use(cors()); 
app.use(express.json());

// Employee routes
app.get('/employee', getEmployees);
app.get('/employee/total', getTotalEmployees); // <-- total employees route
// app.post('/employee', postEmployee);
// app.patch('/employee/:employeeId', patchEmployee);
// app.delete('/employee/:employeeId', deleteEmployee);

// Attendance routes
app.get('/attendance', getAttendance);
app.post('/attendance', postAttendance);
app.patch('/attendance/:attendancedID', patchAttendance);
app.delete('/attendance/:attendancedID', deleteAttendance);

app.get('/leave',getLeave)
app.post('/leave', postLeave)
app.patch('/leave',patchLeave)
app.delete('/leave',deleteLeave)

// Start server
app.listen(2006, () => {
    console.log('Server running at http://localhost:2006');
});

