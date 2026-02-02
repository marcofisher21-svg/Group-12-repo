// import { getAllAttendance, getEmployeeAttendance } from './module_2_DB.js';

// export const getAttendance = async (req, res) => {
//     try {
//         const attendance = await getAllAttendance();
//         res.json({
//             success: true,
//             data: attendance,
//             count: attendance.length
//         });
//     } catch (error) {
//         console.error("Error fetching attendance:", error);
//         res.status(500).json({
//             success: false,
//             error: "Failed to fetch attendance data"
//         });
//     }
// };

// export const getAttendanceByEmployee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const attendance = await getEmployeeAttendance(id);
//         res.json({
//             success: true,
//             data: attendance
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: "Failed to fetch employee attendance"
//         });
//     }
// };