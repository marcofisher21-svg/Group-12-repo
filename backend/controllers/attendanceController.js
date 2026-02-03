


import {
  getAttendance_db,
  postAttendance_db,
  patchAttendance_db,
  deleteAttendance_db
} from "../models/attendanceModel.js";

export const getAttendance = async (req, res) => {
  const data = await getAttendance_db();
  res.json({ Attendance: data });
};

export const postAttendance = async (req, res) => {
  const {
    attendancedID,
    attendanceDate,
    status,
    employeeId,
    image
  } = req.body;

  await postAttendance_db(
    attendancedID,
    attendanceDate,
    status,
    employeeId,
    image
  );

  res.json({ message: 'Attendance added' });
};

/* PATCH */
export const patchAttendance = async (req, res) => {
  const { employeeId } = req.params;
  const {
    attendancedID,
    attendanceDate,
    status,
    image
  } = req.body;

  await patchAttendance_db(
    attendancedID,
    attendanceDate,
    status,
    employeeId,
  );

  res.json({ message: 'Attendance updated' });
};

export const deleteAttendance = async (req, res) => {
  const { employeeId } = req.params;
  await deleteAttendance_db(employeeId);
  res.json({ message: 'Attendance deleted' });
};
