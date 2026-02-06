import express from 'express';
import cors from 'cors';

// Employee controllers (UNCHANGED)
import {
    getEmployees,
    getTotalEmployees
} from './controllers/employeeController.js';

//  Attendance controller functions (keep if you need them)
import { getAttendance } from './controllers/attendanceController.js';


import { getLeave,patchLeave,postLeave,deleteLeave } from './controllers/leaveController.js'

// 🔹 Payroll controller functions
import { getPayroll, postPayroll, patchPayroll, deletePayroll } from './controllers/payrollController.js';
import { postLeaveApplication } from './controllers/applicationController.js';

const app = express();
app.use(cors()); 
app.use(express.json());

// Employee routes
app.get('/employee', getEmployees);
app.get('/employee/total', getTotalEmployees);

// Attendance routes
app.get('/attendance', getAttendance);


app.get('/leave',getLeave)
app.post('/leave', postLeave)
app.patch('/leave/:leaveRequests_ID', patchLeave);
app.delete('/leave',deleteLeave)

// Start server

// 🔹 Payroll routes
app.get('/payroll', getPayroll);
app.post('/payroll', postPayroll);
app.patch('/payroll/:payroll_id', patchPayroll);
app.delete('/payroll/:payroll_id', deletePayroll);

// 🔹 Leave application route
app.post('/application/leave', postLeaveApplication);


// 🔹 Start server
app.listen(2006, () => {
    console.log('Server running at http://localhost:2006');
});
