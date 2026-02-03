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
    password: 'Yaqoob_sams1',
    database: 'moduleproject2_db',

});

//employee info 
// get
const getEmployee_db= async()=>{
    let [data]= await pool.query('SELECT * FROM employeeinformation;');
    return data
}

app.get('/employee', async(req,res)=>{
    res.json({employee:await getEmployee_db()})
})

//patch
const patchEmployee_db=async(employeeId, name, position, department, salary, employmentHistory, contact, image)=>{
    let [data]= await pool.query('UPDATE `employeeinformation` SET `position` = COALESCE(?,position), `department` = COALESCE(?,department), `salary` = COALESCE(?,salary), `employmentHistory` = COALESCE(?,employmentHistory), `contact` = COALESCE(?,contact) WHERE (`employeeId` = ?);',[employeeId, name, position, department, salary, employmentHistory, contact, image]);
    return data 
}

app.patch('/employee',async(req,res)=>{
    res.json({employee: await  patchEmployee_db})
})

//post
const postEmployee_db=async()=>{
    let [data]= await pool.query('INSERT INTO `employeeinformation` (`employeeId`, `name`, `position`, `department`, `salary`, `employmentHistory`, `contact`, `image`) VALUES (?, ?, ?, ?,?, ?, ?, ?);');
    return data 
}

app.post('/employee',async(req,res)=>{
    res.json({employee:await postEmployee_db()})
})

//attendance
//get
const getAttendance_db=async()=>{
    let [data]= await pool.query('SELECT * FROM attendance;');
    return data
}


app.get('/attendance',async(req,res)=>{
    res.json({attendance:await getAttendance_db()})
})

//patch
const patchAttendance_db=async(attendanceDate,status,employeeId,attendancedID)=>{
   let [data]= await pool.query('UPDATE `attendance` SET `attendanceDate` =  COALESCE(?, attendanceDate), `status` = COALESCE(?,status ), `employeeId`= COALESCE(?, employeeId) WHERE `attendancedID` = ?;',[attendanceDate,status,employeeId,attendancedID]);
   return data;
}

app.patch('/attendance',async(req,res)=>{
    res.json({attendance:await patchAttendance_db()})
})

//post
const postAttendance_db=async(attendancedID,attendanceDate, status, employeeId)=>{
    let [data]= await pool.query('INSERT INTO `attendance` (`attendancedID`, `attendanceDate`, `status`, `employeeId`) VALUES (?, ?, ?,?);');
    return data
}

app.post('/attendance',async(req,res)=>{
    res.json({attendance:await postAttendance_db()})
})

//delete
const deleteAttendance_db=async()=>{
    let [data] =await pool.query('DELETE FROM `attendance` WHERE (`attendancedID` = ?);',[attendancedID])
    return data
}

app.delete('/attendance',async(req,res)=>{
    res.json({attendance: await deleteAttendance_db()})
})

// server host
app.listen(2006, () => {
    console.log('http://localhost:2006');

})
// Routes

