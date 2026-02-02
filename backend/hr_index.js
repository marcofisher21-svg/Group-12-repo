import express from 'express';
import mysql from 'mysql2/promise';
//import cors from 'cors';
// import { getAttendance, getAttendanceByEmployee } from './backend/controllers/module_2_Con.js';

const app = express();
const port = 3000;

app.use(express.json());
//app.use(cors()); // Uncomment this to allow Vue frontend

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yaqoob_sams1',
    database: 'moduleproject2_db',

});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
    console.log(`Attendance API: http://localhost:${port}/attendance`);
});

// Routes
// app.get('/attendance', getAttendance);
// // app.get('/attendance/employee/:id', getAttendanceByEmployee);

// // Test route
// app.get('/', (req, res) => {
//     res.json({
//         message: 'HR Attendance API',
//         endpoints: {
//             allAttendance: 'GET /attendance',
//             employeeAttendance: 'GET /attendance/employee/:id'
//         }
//     });
// });

