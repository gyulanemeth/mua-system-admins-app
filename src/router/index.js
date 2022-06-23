import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import NavBar from '../components/NavBar.vue'
import Invite from '../components/Invite.vue'
import SetPassword from '../components/SetPassword.vue'
import ForgetPassword from '../components/ForgetPassword.vue'
import UpdatePassword from '../components/UpdatePassword.vue'
import UpdateName from '../components/UpdateName.vue'
import ResetPassword from '../components/ResetPassword.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admins',
      component: HomeView
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: HomeView
    },
    {
      path: '/updateName',
      name: 'updateName',
      component: UpdateName
    },
    {
      path: '/updatePassword',
      name: 'updatePassword',
      component: UpdatePassword
    },

    {
      path: '/me',
      name: 'me',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgetPassword
    },
    {
      path: '/forgot-password/reset',
      name: 'forgot-password-reset',
      component: ResetPassword
    },
    {
      path: '/invitation',
      name: 'invite',
      component: Invite
    },
    {
      path: '/invitation/accept',
      name: 'accept-invitation',
      component: SetPassword
    },
    {
      path: '/admins/:id',
      name: 'admin',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
