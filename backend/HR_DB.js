import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'moduleproject2_db',
    password: 'Yaqoob_sams1',
});

pool.getConnection()
;(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully!");
        connection.release();
    } catch (err) {
        console.error("Database connection error:", err);
    }
})();

export default pool;