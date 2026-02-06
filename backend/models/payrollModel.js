import mysql from 'mysql2/promise';

//  DB connection using your credentials (MATCHES employeeModel.js)
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Yaqoob_sams1',
  database: 'moduleproject2_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all payroll
export const getAllPayroll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM payroll');
    return rows;
  } catch (err) {
    throw new Error('Error fetching payroll: ' + err.message);
  }
};

// Add new payroll
export const addPayroll = async ({ employeeId, baseSalary, bonus, deductions, totalPay, payDate }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO payroll (employeeId, baseSalary, bonus, deductions, totalPay, payDate) VALUES (?, ?, ?, ?, ?, ?)',
      [employeeId, baseSalary, bonus, deductions, totalPay, payDate]
    );
    return result;
  } catch (err) {
    throw new Error('Error adding payroll: ' + err.message);
  }
};

// Update payroll
export const updatePayroll = async (payroll_id, { baseSalary, bonus, deductions, totalPay, payDate }) => {
  try {
    const [result] = await pool.query(
      'UPDATE payroll SET baseSalary = ?, bonus = ?, deductions = ?, totalPay = ?, payDate = ? WHERE payroll_id = ?',
      [baseSalary, bonus, deductions, totalPay, payDate, payroll_id]
    );
    return result;
  } catch (err) {
    throw new Error('Error updating payroll: ' + err.message);
  }
};

// Delete payroll
export const deletePayrollRecord = async (payroll_id) => {
  try {
    const [result] = await pool.query('DELETE FROM payroll WHERE payroll_id = ?', [payroll_id]);
    return result;
  } catch (err) {
    throw new Error('Error deleting payroll: ' + err.message);
  }
};