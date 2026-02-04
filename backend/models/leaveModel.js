import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yaqoob_sams1',
    database: 'moduleproject2_db',

});

/* GET */
export const getLeave_db = async()=>{
const [data]= await pool.query('SELECT * FROM leaverequests;');
    return data;
}

/* POST */
export const postLeave_db=async(leaveRequest_ID,leaveDate,reason,leaveStatus,employeeId)=>{
    const [data] = await pool.query('INSERT INTO `moduleproject2_db`.`leaverequests` (`leaveRequests_ID`, `leaveDate`, `reason`, `lesveStatus`, `employeeId`) VALUES (?, ?, ?, ?, ?);',[leaveRequest_ID,leaveDate,reason,leaveStatus,employeeId]);
    return data;
}

/* PATCH */
export const patchLeave_db=async(leaveRequest_ID,leaveDate,reason,leaveStatus,employeeId)=>{
  const [data]= await pool.query('UPDATE `leaverequests` SET `leaveDate` = COALESCE(?, leaveDate), `reason` = COALESCE(?, reason), `leaveStatus` = COALESCE(?, leaveStatus), `employeeId` = COALESCE(?, employeeId) WHERE (`leaveRequests_ID` = ?);',[leaveDate,reason,leaveStatus,employeeId,leaveRequest_ID]);
  return data
}

/* DELETE */
export const deleteLeave_db=async(leaveRequest_ID)=>{
  await pool.query('DELETE FROM `leaverequests` WHERE (`leaveRequests_ID` = ?);',[leaveRequest_ID]);
};