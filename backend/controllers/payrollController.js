import { getAllPayroll, addPayroll, updatePayroll, deletePayrollRecord } from '../models/payrollModel.js';

// Get all payroll records
export const getPayroll = async (req, res) => {
  try {
    const payrolls = await getAllPayroll();
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new payroll record
export const postPayroll = async (req, res) => {
  try {
    const result = await addPayroll(req.body);
    res.status(201).json({ message: 'Payroll added successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payroll record
export const patchPayroll = async (req, res) => {
  try {
    const { payroll_id } = req.params;
    const result = await updatePayroll(payroll_id, req.body);
    res.json({ message: 'Payroll updated successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete payroll record
export const deletePayroll = async (req, res) => {
  try {
    const { payroll_id } = req.params;
    const result = await deletePayrollRecord(payroll_id);
    res.json({ message: 'Payroll deleted successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};