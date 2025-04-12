import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/PageLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserManagerment from '@/pages/UserManagerment.vue'

const routesWithLayouts = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
      {
        path: 'user-managerment',
        name: 'UserManagerment',
        component: UserManagerment,
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
