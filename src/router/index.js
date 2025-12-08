import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import loginPage from '../views/loginPage.vue'
import AttendancePage from '../views/attendancePage.vue'

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
  }
  
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
