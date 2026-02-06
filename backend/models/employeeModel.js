
import mysql from 'mysql2/promise';

//  DB connection using your credentials
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mercygrey99',
    database: 'moduleproject2_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export const getEmployee_db = async () => {
    const [rows] = await pool.query('SELECT * FROM employeeInformation;');
    return rows;
};

//  Get total employees
export const getTotalEmployees_db = async () => {
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM employeeInformation;');
    return rows[0].total;
};

// Add a new employee
export const postEmployee_db = async (
    employeeId,
    name,
    position,
    department,
    salary,
    employmentHistory,
    contact,
    image
) => {
    const query = `
        INSERT INTO employeeInformation
        (employeeId, name, position, department, salary, employmentHistory, contact, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [
        employeeId,
        name,
        position,
        department,
        salary,
        employmentHistory,
        contact,
        image
    ]);
};