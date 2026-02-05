// controllers/leaveController.js
import {
  getLeave_db,
  postLeave_db,
  patchLeave_db,
  deleteLeave_db 
} from "../models/leaveModel.js";

/* GET */
export const getLeave = async (req, res) => {
  const data = await getLeave_db();
  res.json({ Leave: data });
};

/* POST */
export const postLeave=async(req,res)=>{
  const {
  leaveRequest_ID,
  leaveDate,
  reason,
  leaveStatus,
  employeeId}=req.body;

  await postLeave_db(leaveRequest_ID,
    leaveDate,reason,
    leaveStatus,
    employeeId);

    res.json({ leave:'Leave request added'})
}

/* PATCH */
export const patchLeave=async(req,res)=>{
  const {leaveRequest_ID}=req.params;
   const {
    leaveDate,
   reason,
   leaveStatus,
   employeeId
  } = req.body;

  await patchLeave_db(leaveRequest_ID,
    leaveDate,
    reason,
    leaveStatus,
    employeeId
  );

  res.json({ leave:'leave updated '})
}

/* DELETE */
export const deleteLeave = async(req,res)=>{
  await deleteLeave_db(req.body.leaveRequest_ID);
  res.json({ leave: 'Leave request deleted'})
}