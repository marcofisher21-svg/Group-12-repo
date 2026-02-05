import { getAttendance_db } from '../models/attendanceModel.js';

export const getAttendance = async (req, res) => {
    try {
        const attendance = await getAttendance_db();
        res.json(attendance);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Failed to fetch attendance' });
    }
};



