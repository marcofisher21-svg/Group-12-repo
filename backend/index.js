// index.js
import express from 'express';
import cors from 'cors'; 
import {
  getEmployees,
  postEmployee,
  patchEmployee,
  deleteEmployee
} from './controllers/employeeController.js';

const app = express();
app.use(cors()); 
app.use(express.json());

app.get('/employee', getEmployees);
app.post('/employee', postEmployee);
app.patch('/employee/:employeeId', patchEmployee);
app.delete('/employee/:employeeId', deleteEmployee);

app.listen(2006, () => {
  console.log('http://localhost:2006');
});
