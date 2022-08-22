import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import SetAndReSetPasswordView from '../views/SetAndReSetPasswordView.vue'
import AdminLogin from '../components/AdminLogin.vue'
import MeView from '../views/MeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admins',
      name: 'admins',
      component: HomeView
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: HomeView
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: MeView
    },
    {
      path: '/me',
      name: 'me',
      component: MeView
    },
    {
      path: '/',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/forgot-password/reset',
      name: 'forgot-password-reset',
      component: SetAndReSetPasswordView
    },

    {
      path: '/invitation/accept',
      name: 'accept-invitation',
      component: SetAndReSetPasswordView
    },
    {
      path: '/admins/:id',
      name: 'admin',
      component: HomeView
    }
  ]
})

export default router
