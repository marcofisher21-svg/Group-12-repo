import { getLeave_db, updateLeave_db, createLeave_db, deleteLeave_db } from '../models/leaveModel.js';

// GET all leave requests
export const getLeave = async (req, res) => {
  try {
    const leave = await getLeave_db();
    res.json({ Leave: leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new leave request
export const postLeave = async (req, res) => {
  try {
    const { leaveDate, reason, leaveStatus, employeeId } = req.body;
    const insertId = await createLeave_db({ leaveDate, reason, leaveStatus, employeeId });
    res.status(201).json({ message: 'Leave request created', insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE leave status
export const patchLeave = async (req, res) => {
  try {
    const { leaveStatus } = req.body;
    const { leaveRequests_ID } = req.params;

    await updateLeave_db(leaveRequests_ID, leaveStatus);
    res.json({ message: 'Leave status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE leave request
export const deleteLeave = async (req, res) => {
  try {
    const { leaveRequests_ID } = req.body; // you can switch to req.params if needed
    await deleteLeave_db(leaveRequests_ID);
    res.json({ message: 'Leave request deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
