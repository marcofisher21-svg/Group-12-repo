import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mercygrey99',
    database: 'moduleproject2_db',
});

// GET all leave requests
export const getLeave_db = async () => {
  const [rows] = await pool.query(`
    SELECT 
      l.leaveRequests_ID,
      l.leaveDate,
      l.reason,
      l.leaveStatus,
      l.employeeId,
      e.name AS employeeName
    FROM leaverequests l
    JOIN employeeinformation e 
      ON l.employeeId = e.employeeId
    ORDER BY l.leaveDate DESC;
  `);
  return rows;
};

// CREATE a leave request
export const createLeave_db = async ({ leaveDate, reason, leaveStatus, employeeId }) => {
  const [result] = await pool.query(
    `INSERT INTO leaverequests (leaveDate, reason, leaveStatus, employeeId) VALUES (?, ?, ?, ?);`,
    [leaveDate, reason, leaveStatus, employeeId]
  );
  return result.insertId;
};

// UPDATE leave status
export const updateLeave_db = async (id, leaveStatus) => {
  const [result] = await pool.query(
    'UPDATE leaverequests SET leaveStatus = ? WHERE leaveRequests_ID = ?;',
    [leaveStatus, id]
  );
  return result;
};

// DELETE leave request
export const deleteLeave_db = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM leaverequests WHERE leaveRequests_ID = ?;',
    [id]
  );
  return result;
};
