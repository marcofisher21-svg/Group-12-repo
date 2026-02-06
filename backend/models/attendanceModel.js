import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mercygrey99',
    database: 'moduleproject2_db',
});

export const getAttendance_db = async () => {
    const [rows] = await pool.query(`
        SELECT 
            a.attendancedID,
            a.attendanceDate,
            a.status,
            a.employeeId,
            e.name AS employeeName
        FROM attendance a
        JOIN employeeInformation e 
            ON a.employeeId = e.employeeId
        ORDER BY a.employeeId, a.attendanceDate;
    `);

    return rows;
};


// 🔹 Optional: Add new attendance (commented out for now)
// export const postAttendance_db = async (attendancedID, attendanceDate, status, employeeId) => {
//     const [data] = await pool.query(
//         'INSERT INTO attendance (attendancedID, attendanceDate, status, employeeId) VALUES (?, ?, ?, ?);',
//         [attendancedID, attendanceDate, status, employeeId]
//     );
//     return data;
// };

// 🔹 Optional: Update attendance (commented out for now)
// export const patchAttendance_db = async (attendanceDate, status, employeeId, attendancedID) => {
//     const [data] = await pool.query(
//         'UPDATE attendance SET attendanceDate = COALESCE(?, attendanceDate), status = COALESCE(?, status), employeeId = COALESCE(?, employeeId) WHERE attendancedID = ?;',
//         [attendanceDate, status, employeeId, attendancedID]
//     );
//     return data;
// };

// 🔹 Optional: Delete attendance (commented out for now)
// export const deleteAttendance_db = async (attendancedID) => {
//     await pool.query('DELETE FROM attendance WHERE attendancedID = ?;', [attendancedID]);
// };
