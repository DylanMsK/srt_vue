import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: () => import('@/views/TicketingView.vue')
    },
    {
      path: '/reserve/check',
      name: 'checkReserve',
      props: true,
      component: () => import('@/views/TicketingCheckView.vue')
    },
    {
      path: '/riRnf',
      name: 'admin',
      component: () => import('@/views/AdminView.vue')
    },
  ],
  scrollBehavior: () => ({ y: 0 })
})
