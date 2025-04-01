const Layout = () => import('@/layouts/AdminLayout.vue')
const Dasboard = () => import('@/pages/admin/Dasboard.vue')
const UserManagerment = () => import('@/pages/admin/UserManagerment.vue')

const routesWithLayouts = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dasboard',
        component: Dasboard,
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

export default routesWithLayouts.concat(routesWithoutLayouts)
