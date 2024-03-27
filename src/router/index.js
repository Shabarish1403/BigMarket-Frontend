import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import HomeView from '../views/HomeView.vue'
// import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'
import PurchaseView from '../views/PurchaseView.vue'
import AdminView from '../views/AdminView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'HomeView' }
  },
  {
    path: '/BigMarket-Frontend/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/BigMarket-Frontend/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/purchases',
    name: 'PurchaseView',
    component: PurchaseView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
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
        next()
    }
  }, "0.1")
})

export default router
