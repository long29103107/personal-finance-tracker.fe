import { createRouter, createWebHistory } from 'vue-router'
import user from './clientRouter'

const routes = [
  // ...admin,
  ...user,
  {
    path: '/',
    component: () => import('@/pages/errors/Page404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
