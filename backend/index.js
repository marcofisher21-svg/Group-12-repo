import express from 'express';
import cors from 'cors';

// Employee controllers (UNCHANGED)
import {
    getEmployees,
    getTotalEmployees
} from './controllers/employeeController.js';

// Attendance controller
import { getAttendance } from './controllers/attendanceController.js';

const app = express(); // ✅ ONLY ONCE
app.use(cors());
app.use(express.json());

// Employee routes (DO NOT TOUCH)
app.get('/employee', getEmployees);
app.get('/employee/total', getTotalEmployees);

// Attendance route
app.get('/attendance', getAttendance);

app.listen(2006, () => {
    console.log('Server running at http://localhost:2006');
});
