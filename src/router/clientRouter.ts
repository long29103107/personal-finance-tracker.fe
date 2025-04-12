import Layout from '@/layouts/PageLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'

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

export default routesWithLayouts.concat(routesWithoutLayouts)
