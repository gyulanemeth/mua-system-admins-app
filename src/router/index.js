import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UpdatePassword from '../components/UpdatePassword.vue'
import EmailAndNameFormView from '../views/EmailAndNameFormView.vue'
import SetAndReSetPasswordView from '../views/SetAndReSetPasswordView.vue'
import Login from '../components/Login.vue'
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
      component: EmailAndNameFormView
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
