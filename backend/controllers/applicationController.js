import { findEmployeeIdByName, createLeaveApplication } from '../models/applicationModel.js';

export const postLeaveApplication = async (req, res) => {
  try {
    const { fullName, startDate, reason } = req.body;

    const employeeId = await findEmployeeIdByName(fullName);
    if (!employeeId) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await createLeaveApplication({
      employeeId,
      leaveDate: startDate,
      reason,
      leaveStatus: 'Pending'
    });

    res.status(201).json({ message: 'Leave application submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
