import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/PageLayout.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserManagermentPage from '@/pages/UserManagermentPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import GoalPage from '@/pages/GoalPage.vue'
import BudgetPage from '@/pages/BudgetPage.vue'
import ReportPage from '@/pages/ReportPage.vue'

const routesWithLayouts = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: DashboardPage,
      },
      {
        path: 'user-managerment',
        name: 'UserManagerment',
        component: UserManagermentPage,
      },
      {
        path: 'categories',
        name: 'categories',
        component: CategoryPage,
      },
      {
        path: 'goals',
        name: 'Goals',
        component: GoalPage,
      },
      {
        path: 'budgets',
        name: 'Budgets',
        component: BudgetPage,
      },
      {
        path: 'reports',
        name: 'Reports',
        component: ReportPage,
      },
    ],
  },
]

const routesWithoutLayouts = [
  {
    path: '/',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginPage,
      },
    ],
  },
]

const routes = [
  ...routesWithLayouts,
  ...routesWithoutLayouts,
  {
    path: '/',
    component: () => import('@/pages/errors/Page404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')

//   if (!token && to.path !== '/login') {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
