# Group-12-repo
This is group 12's HR project 

1. Clone the Repository

Open your terminal and run:

git clone (https://github.com/marcofisher21-svg/Group-12-repo.git)

Then enter the project folder:

cd Group-12-repo

2. Install Dependencies

Make sure you have Node.js 16+ installed.

Install project packages:

npm install

This will download all required dependencies listed in package.json.

3.1 database configuration

# Windows (Command Prompt as Admin)
net start mysql

# OR using Services
services.msc → Find "MySQL" → Start

3.2 create database and import schema

 Connect to MySQL
mysql -u root -p

 Execute in MySQL
CREATE DATABASE IF NOT EXISTS moduleproject2_db;
USE moduleproject2_db;

Import schema
SOURCE Dump20260203.sql;

Verify tables
SHOW TABLES;

 Tables_in_moduleproject2_db

 employeeinformation        
 attendance                 
 payroll                    
 leaverequests   

 3.3 create .env file in backend folder

.env file mockup``
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=moduleproject2_db
PORT=2006``

4.backend setup

in VS Code terminal in GitBash

cd backend should ``display Bash backend``

Install dependencies
npm install
Installs: express, mysql2, dotenv, cors

Start development server

node index.js

nodemon index.js

Expected output:
Server running on http://localhost:2006
Database connected successfully!

4.1 test backend 

using API's with thunderclient which can be installed from VS Code and used in VS Code

Test endpoints
curl http://localhost:2006/employee
curl http://localhost:2006/employee/total
curl http://localhost:2006/attendance

5.) frontend setup

in VS Code terminal in gitBash

in a new terminal entry with bash backend still visible

cd Group-12-repo

Install dependencies
npm install
Installs: vue, vue-router, axios, bootstrap

Start development server
npm run dev

Expected output:
Vite dev server running at:
  ➜  Local:   http://localhost:5173/
  
Troubleshooting

  Common Issues & Solutions
  
Issue	Solution

MySQL Connection Failed	
1. Check MySQL service is running
2. Verify password in .env
3. Test: mysql -u root -p
Port 2006 already in use	Change PORT in .env or kill process: netstat -ano | findstr :2006
CORS Errors	Ensure cors() middleware is enabled in index.js
Vue Dev Server Not Starting	Check node_modules: rm -rf node_modules && npm install
API Returns 404	Verify endpoint spelling and server is running

group work on the frontend

Mische worked on the loginpage,dashboard,navbar,applicationpage and styling

Yaqoob worked on the attendancepage,employeepage,leavepage

Marco worked on the payrollpage and added images to employee profiles

group work on backend

Mische worked on backend:
                  frontend integration for employee,leave,attendance,dashboard,application
                  routing employee
                  error handling for employee
                  reviewed and refined the backend code

Yaqoob worked on backend: 
                  sql data conversion for all the pages, 
                  QA testing 
                  routing leaverequests
                  error handling for leaverequests

Marco worked on backend:
                  security,
                  error handling for payroll,attendance
                  validation for the rest of the pages,
                  routing attendance and payroll
                  assisted Yaqoob in redisplaying the employee images using SQL data in the employee page
                  and this read.me file

This project demonstrates full-stack development skills with modern web technologies, proper database design, and team collaboration.
