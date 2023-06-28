import { createRouter, createWebHistory } from 'vue-router'
import jwtDecode from 'jwt-decode'

import HomeView from '../views/HomeView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import SetAndReSetPasswordView from '../views/SetAndReSetPasswordView.vue'
import AdminLogin from '../components/AdminLogin.vue'
import MeView from '../views/MeView.vue'
import RedirectToLoginMessage from '../views/RedirectToLoginMessage.vue'

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
    },
    {
      path: '/redirectToLoginMessage',
      name: 'redirectToLoginMessage',
      component: RedirectToLoginMessage
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.query.logout) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('loginToken')
    next({path: '/'})
  }
  if (localStorage.getItem('accessToken') && to.path !== '/redirectToLoginMessage') {
    const decoded = jwtDecode(localStorage.getItem('accessToken'))
    const now = Date.now().valueOf() / 1000
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      localStorage.removeItem('accessToken')
      return window.location.href = '/redirectToLoginMessage'
    }
  }

  if (!localStorage.getItem('accessToken') && to.path !== '/' && to.path !== '/redirectToLoginMessage' && to.path !== '/forgot-password/reset' && to.path !== '/invitation/accept' && to.path !== '/forgot-password' && to.path !== '/verify-email') {
    next({path: '/'})
  } else next()
})

export default router
