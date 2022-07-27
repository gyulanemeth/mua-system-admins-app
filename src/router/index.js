import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import EmailAndNameFormView from '../views/EmailAndNameFormView.vue'
import SetAndReSetPasswordView from '../views/SetAndReSetPasswordView.vue'
import UpdatePassword from '../components/UpdatePassword.vue'
import AdminLogin from '../components/AdminLogin.vue'
import CreateAccountView from '../views/CreateAccountView.vue'

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
      path: '/updateName',
      name: 'update-name',
      component: EmailAndNameFormView
    },
    {
      path: '/updatePassword',
      name: 'update-password',
      component: UpdatePassword
    },
    {
      path: '/createAccount',
      name: 'create-account',
      component: CreateAccountView
    },
    {
      path: '/me',
      name: 'me',
      component: HomeView
    },
    {
      path: '/',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: EmailAndNameFormView
    },
    {
      path: '/forgot-password/reset',
      name: 'forgot-password-reset',
      component: SetAndReSetPasswordView
    },
    {
      path: '/invitation',
      name: 'invite',
      component: EmailAndNameFormView
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
