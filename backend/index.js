import express from 'express';
import mysql from 'mysql2/promise';
//import cors from 'cors';
// import { getAttendance, getAttendanceByEmployee } from './backend/controllers/module_2_Con.js';

const app = express();

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
    let{employeeId, name, position, department, salary, employmentHistory, contact, image}=req.body;
    await patchEmployee_db(employeeId, name, position, department, salary, employmentHistory, contact, image);
    res.json({ employees: 'employee info updated'});
})

//post
const postEmployee_db=async(employeeId, name, position, department, salary, employmentHistory, contact, image)=>{
    let [data]= await pool.query('INSERT INTO `employeeinformation` (`employeeId`, `name`, `position`, `department`, `salary`, `employmentHistory`, `contact`, `image`) VALUES (?, ?, ?, ?,?, ?, ?, ?);',[employeeId, name, position, department, salary, employmentHistory, contact, image]);
    return data 
}

app.post('/employee',async(req,res)=>{
    const{employeeId, name, position, department, salary, employmentHistory, contact, image}=req.body;
    await postEmployee_db(employeeId, name, position, department, salary, employmentHistory, contact, image);
    res.json({employee:'employee info added '})
})


//delete
const deleteEmployee_db=async(employeeId)=>{
    let [data]= await pool.query('DELETE FROM `employeeinformation` WHERE (`employeeId` = ?);');
    return data
}

app.delete('/employee/:employeeId',async(req,res)=>{
    await deleteEmployee_db(req.params)
    res.json({employee:'user deleted'})
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
    let{attendanceDate,status,employeeId,attendancedID}=req.body;
    await patchAttendance_db(attendanceDate,status,employeeId,attendancedID);
    res.json({ attendance: 'Attendance updated'});
})

//post
const postAttendance_db=async(attendancedID,attendanceDate, status, employeeId)=>{
    let [data]= await pool.query('INSERT INTO `attendance` (`attendancedID`, `attendanceDate`, `status`, `employeeId`) VALUES (?, ?, ?,?);',[attendancedID,attendanceDate, status, employeeId]);
    return data
}

app.post('/attendance',async(req,res)=>{
    const {attendancedID,attendanceDate, status, employeeId} =req.body;
    await postAttendance_db(attendancedID,attendanceDate, status, employeeId);
    const attendance = await getAttendance_db();
    res.json({attendance})
})

//delete
const deleteAttendance_db=async(attendancedID)=>{
    let [data] =await pool.query('DELETE FROM `attendance` WHERE (`attendancedID` = ?);',[attendancedID])
    return data
}

app.delete('/attendance',async(req,res)=>{
    await deleteAttendance_db(req.params)
    res.json({attendance:'deleted attendance record'})
})

// server host
app.listen(2006, () => {
    console.log('http://localhost:2006');

})