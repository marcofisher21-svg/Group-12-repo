import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mercygrey99',
  database: 'moduleproject2_db',
});

export const findEmployeeIdByName = async (name) => {
  const [rows] = await pool.query(
    'SELECT employeeId FROM employeeinformation WHERE name = ? LIMIT 1;',
    [name]
  );
  return rows[0]?.employeeId ?? null;
};

export const createLeaveApplication = async ({ employeeId, leaveDate, reason, leaveStatus }) => {
  const [result] = await pool.query(
    'INSERT INTO leaverequests (leaveDate, reason, leaveStatus, employeeId) VALUES (?, ?, ?, ?);',
    [leaveDate, reason, leaveStatus, employeeId]
  );
  return result.insertId;
};
