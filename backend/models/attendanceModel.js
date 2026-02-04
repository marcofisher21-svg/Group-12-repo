import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yaqoob_sams1',
    database: 'moduleproject2_db',

});

export const getAttendance_db = async()=>{
const [data]= await pool.query('SELECT * FROM attendance;');
    return data;
}

export const patchAttendance_db = async(attendanceDate,status,employeeId,attendancedID)=>{
   const [data]= await pool.query('UPDATE `attendance` SET `attendanceDate` =  COALESCE(?, attendanceDate), `status` = COALESCE(?,status ), `employeeId`= COALESCE(?, employeeId) WHERE `attendancedID` = ?;',[attendanceDate,status,employeeId,attendancedID]);
   return data;
}
export const postAttendance_db=async(attendancedID,attendanceDate, status, employeeId)=>{
    const [data]= await pool.query('INSERT INTO `attendance` (`attendancedID`, `attendanceDate`, `status`, `employeeId`) VALUES (?, ?, ?,?);',[attendancedID,attendanceDate, status, employeeId]);
    return data;
}

export const deleteAttendance_db=async(attendancedID)=>{
    await pool.query('DELETE FROM `attendance` WHERE (`attendancedID`=?);',[attendancedID]);
}