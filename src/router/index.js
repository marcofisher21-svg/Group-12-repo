import { createRouter, createWebHistory } from "vue-router";
import loginPage from "../views/loginPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import payrollPage from "../views/PayRollModal.vue";
import payslipPage from "../views/PaySlipModal.vue";
import PayRollModal from "../views/PayRollModal.vue";
import PaySlipModal from "../views/PaySlipModal.vue";

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
    path: '/payroll',
    name: 'payroll',
    component: PayRollModal
  },
  {
    path: '/payslip',
    name: 'payslip',
    component: PaySlipModal
  }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
