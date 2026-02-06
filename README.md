# Group-12-repo
Group 12's HR project (Vue + Express + MySQL).

**Repository clone**
```bash
git clone https://github.com/marcofisher21-svg/Group-12-repo.git
cd Group-12-repo
```

**Requirements**
Node.js version: `^20.19.0` or `>=22.12.0`  
MySQL server installed and running

**Frontend dependencies (root `package.json`)**
- `vue`
- `vue-router`
- `vuex`
- `axios`
- `cors`
- `express`
- `mysql2`
- Dev tools: `vite`, `@vitejs/plugin-vue`, `@vitejs/plugin-vue-jsx`, `eslint`, `oxlint`, `npm-run-all2`, `vite-plugin-vue-devtools`, `nodemon`

**Backend dependencies (`backend/package.json`)**
- `express`
- `cors`
- `mysql2`
- `axios`
- Dev tools: `nodemon`

**Install frontend packages**
```bash
npm install
```

**Run frontend (Vite)**
```bash
npm run dev
```

**Database setup**
1. Start MySQL service.
2. Create database:
```sql
CREATE DATABASE IF NOT EXISTS moduleproject2_db;
USE moduleproject2_db;
```
3. Import the dump file:
```sql
SOURCE Dump20260204 (1).sql;
```

**Backend setup**
```bash
cd backend
npm install
```

**MySQL password in backend models**
Make sure the MySQL password in the backend model files matches your local MySQL password:
- `backend/models/attendanceModel.js`
- `backend/models/applicationModel.js`
- `backend/models/leaveModel.js`
- `backend/models/employeeModel.js`
- `backend/models/payrollModel.js`

**Run backend (nodemon)**
User requested steps:
1. `cd backend`
2. `dir`
3. `nodemon index.js`  
   or  
   `npx nodemon index.js`

You can also run:
```bash
node index.js
```

**Test endpoints**
```bash
curl http://localhost:2006/employee
curl http://localhost:2006/employee/total
curl http://localhost:2006/attendance
curl http://localhost:2006/leave
```

**Team contributions**
Frontend:
- Misché: backend base folder structure/base setup,login page, dashboard, navbar, application page, styling
- Yaqoob: attendance page, employee page, leave page
- Marco: payroll page, employee images

Backend:
- Misché: attendance/application integration, routing, error handling
- Yaqoob: SQL data conversion, leave requests routing, leave, dashboard
- Marco:  payroll/validations, routing, employee images integration
