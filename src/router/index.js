import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import loginPage from '../views/loginPage.vue'
import AttendancePage from '../views/attendancePage.vue'
import PayrollPage from '../views/PayRollPage.vue'
import EmployeePage from '../views/employeePage.vue'
import LeavePage from '../views/leavePage.vue'

const routes =  [
    {
      path: '/',
      name: 'loginPage',
      component: loginPage

    },
     {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage
  },
  {
    path:'/attendance',
    name:'attendance',
    component: AttendancePage
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollPage
  },
  {
    path: '/employee',
    name: 'employee',
    component: EmployeePage
    
  },
  {
    path: '/leave',
    name: 'leave',
    component: LeavePage
    
  }
  
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
