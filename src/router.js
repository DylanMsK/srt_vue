import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupForm.vue')
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('@/views/TicketingForm.vue')
    },
    {
      path: '/riRnf',
      name: 'admin',
      component: () => import('@/views/AdminPage.vue')
    },
  ],
  scrollBehavior: () => ({ y: 0 })
})
