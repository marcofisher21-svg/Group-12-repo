import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Yaqoob_sams1',
    database: 'moduleproject2_db',

});


/* GET */
export const getEmployee_db = async () => {
  const [data] = await pool.query('SELECT * FROM employeeinformation;');
  return data;
};

/* POST */
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
  const [data] = await pool.query(
    'INSERT INTO employeeinformation (employeeId, name, position, department, salary, employmentHistory, contact, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
    [employeeId, name, position, department, salary, employmentHistory, contact, image]
  );
  return data;
};

/* PATCH */
export const patchEmployee_db = async (
  employeeId,
  position,
  department,
  salary,
  employmentHistory,
  contact
) => {
  const [data] = await pool.query(
    'UPDATE employeeinformation SET position = COALESCE(?, position), department = COALESCE(?, department), salary = COALESCE(?, salary), employmentHistory = COALESCE(?, employmentHistory), contact = COALESCE(?, contact) WHERE employeeId = ?;',
    [position, department, salary, employmentHistory, contact, employeeId]
  );
  return data;
};

/* DELETE */
export const deleteEmployee_db = async (employeeId) => {
  const [data] = await pool.query(
    'DELETE FROM employeeinformation WHERE employeeId = ?;',
    [employeeId]
  );
  return data;
};
