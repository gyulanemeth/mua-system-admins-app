import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/me',
      name: 'me',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: HomeView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: HomeView
    },
    {
      path: '/forgot-password/reset',
      name: 'forgot-password',
      component: HomeView
    },
    {
      path: '/invitation',
      name: 'invite',
      component: HomeView
    },
    {
      path: '/invitation/accept',
      name: 'accept-invitation',
      component: HomeView
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: HomeView
    },
    {
      path: '/admins',
      name: 'admins',
      component: HomeView
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
