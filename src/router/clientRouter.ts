import Layout from '@/layouts/ClientPageLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'

export default [
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
        path: 'login',
        name: 'Login',
        component: LoginPage,
      },
    ],
  },
]
