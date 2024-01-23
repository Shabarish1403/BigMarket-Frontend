import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: {
      requireLogin: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  setTimeout(() => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
      next('/login')
    } else {
      // if (to.path === '/' && store.state.isAuthenticated) {
      //   next('/dashboard');
      // } else {
        next()
      // }
    }
  }, "0.1")
})

export default router
