import { createRouter, createWebHistory } from 'vue-router'
import UsersPage from '../components/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users', // Redirect the root path to /users
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage,
    },
  ],
})

export default router
