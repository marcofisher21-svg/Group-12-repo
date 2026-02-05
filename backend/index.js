import express from 'express';
import cors from 'cors';

// Employee controllers (UNCHANGED)
import {
    getEmployees,
    getTotalEmployees
} from './controllers/employeeController.js';

//  Attendance controller functions (keep if you need them)
import { deleteAttendance, getAttendance, postAttendance , patchAttendance } from './controllers/attendanceController.js';

import { getLeave,patchLeave,postLeave,deleteLeave } from './controllers/leaveController.js'



const app = express(); // ✅ ONLY ONCE
app.use(cors());
app.use(express.json());

// Employee routes
app.get('/employee', getEmployees);
app.get('/employee/total', getTotalEmployees);

// Attendance routes
app.get('/attendance', getAttendance);

app.get('/leave',getLeave)
app.post('/leave', postLeave)
app.patch('/leave',patchLeave)
app.delete('/leave',deleteLeave)

// Start server
app.listen(2006, () => {
    console.log('Server running at http://localhost:2006');
});
