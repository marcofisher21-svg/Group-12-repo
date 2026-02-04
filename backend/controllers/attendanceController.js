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

  res.json({ message: 'Attendance record was added' });
};

/* PATCH */
export const patchAttendance = async (req, res) => {
  const { attendancedID } = req.params;
  const {
    attendanceDate,
    status,
    employeeId
  } = req.body;

  await patchAttendance_db(
    attendanceDate,
    status,
    employeeId,
    attendancedID
  );

  res.json({ message: "Attendance record updated" });
};

export const deleteAttendance = async (req, res) => {
  const { attendancedID } = req.body;
  await deleteAttendance_db(attendancedID);
  res.json({ message: 'Attendance record was deleted' });
};


