import {
  getEmployee_db,
  postEmployee_db,
  patchEmployee_db,
  deleteEmployee_db
} from "../models/employeeModel.js";


/* GET */
export const getEmployees = async (req, res) => {
  const data = await getEmployee_db();
  res.json({ employee: data });
};

/* POST */
export const postEmployee = async (req, res) => {
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
};

/* PATCH */
export const patchEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const {
    position,
    department,
    salary,
    employmentHistory,
    contact
  } = req.body;

  await patchEmployee_db(
    employeeId,
    position,
    department,
    salary,
    employmentHistory,
    contact
  );

  res.json({ message: 'Employee updated' });
};

/* DELETE */
export const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;
  await deleteEmployee_db(employeeId);
  res.json({ message: 'Employee deleted' });
};
