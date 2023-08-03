import { createRouter, createWebHistory } from 'vue-router'
import jwtDecode from 'jwt-decode'

import HomeView from '../views/HomeView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import SetAndReSetPasswordView from '../views/SetAndReSetPasswordView.vue'
import AdminLogin from '../components/AdminLogin.vue'
import MeView from '../views/MeView.vue'
import RedirectToLoginMessage from '../views/RedirectToLoginMessage.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admins',
      name: 'admins',
      component: HomeView,
      meta: {
        requiresAuth: true,
        header: 'admins'
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: HomeView,
      meta: {
        requiresAuth: true,
        header: 'accounts'
      }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: MeView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/me',
      name: 'me',
      component: MeView,
      meta: {
        requiresAuth: true,
        header: 'myProfile'
      }
    },
    {
      path: '/change-password',
      name: 'changePassword',
      component: MeView,
      meta: {
        requiresAuth: true,
        header: 'myProfile'
      }
    },
    {
      path: '/change-email',
      name: 'changeEmail',
      component: MeView,
      meta: {
        requiresAuth: true,
        header: 'myProfile'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: MeView,
      meta: {
        requiresAuth: true,
        header: 'myProfile'
      }
    },
    {
      path: '/',
      name: 'login',
      component: AdminLogin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/forgot-password/reset',
      name: 'forgot-password-reset',
      component: SetAndReSetPasswordView,
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/invitation/accept',
      name: 'accept-invitation',
      component: SetAndReSetPasswordView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/admins/:id',
      name: 'admin',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/redirectToLoginMessage',
      name: 'redirectToLoginMessage',
      component: RedirectToLoginMessage,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundView,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.query.logout) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('loginToken')
    next({ path: '/' })
  }

  if (localStorage.getItem('accessToken') && to.path !== '/redirectToLoginMessage') {
    const decoded = jwtDecode(localStorage.getItem('accessToken'))
    const now = Date.now().valueOf() / 1000
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      localStorage.removeItem('accessToken')
      window.location.href = '/redirectToLoginMessage'
      return
    }
  }

  if (!localStorage.getItem('accessToken') && to.meta.requiresAuth) {
    next({ path: '/' })
  } else next()
})

export default router
