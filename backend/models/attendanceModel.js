import { getAttendance_db, patchAttendance_db, postAttendance_db, deleteAttendance_db } from "../db/attendance.js";

export const getAttendance = async (req, res) => {
    const attendance = await getAttendance_db();
    res.json({ Attendance: attendance });
}

export const patchAttendance = async (req, res) => {
    let { attendanceDate, status, employeeId, attendancedID } = req.body;
    await patchAttendance_db(attendanceDate, status, employeeId, attendancedID);
    res.json({ attendance: 'Attendance updated' });
}

export const postAttendance = async (req, res) => {
    const { attendancedID, attendanceDate, status, employeeId } = req.body;
    await postAttendance_db(attendancedID, attendanceDate, status, employeeId);
    const attendance = await getAttendance_db();
    res.json({ attendance })
}

export const deleteAttendance = async (req, res) => {
    await deleteAttendance_db(req.params)
    res.json({ attendance: 'deleted attendance record' })
}