
import { getEmployee_db, getTotalEmployees_db, postEmployee_db } from '../models/employeeModel.js';


export const getEmployees = async (req, res) => {
    try {
        const data = await getEmployee_db();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

export const getTotalEmployees = async (req, res) => {
    try {
        const total = await getTotalEmployees_db();

        console.log('Total employees from DB:', total);

        res.json({ total });
    } catch (err) {
        
        console.error('Error in getTotalEmployees:', err);

        res.status(500).json({ error: 'Failed to fetch total employees' });
    }
};

export const postEmployee = async (req, res) => {
    try {
        const {
            employeeId,
            name,
            position,
            department,
            salary,
            employmentHistory,
            contact,
            image
        } = req.body;

        await postEmployee_db(
            employeeId,
            name,
            position,
            department,
            salary,
            employmentHistory,
            contact,
            image
        );

        res.json({ message: 'Employee added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add employee' });
    }
};
