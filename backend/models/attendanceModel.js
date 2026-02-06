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


