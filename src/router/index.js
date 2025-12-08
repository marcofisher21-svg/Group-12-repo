import { createRouter, createWebHistory } from "vue-router";
import loginPage from "../views/loginPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import PayRollModal from "../views/pay-roll-modal.vue";
import PaySlipModal from "../views/pay-slip-modal.vue";

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
