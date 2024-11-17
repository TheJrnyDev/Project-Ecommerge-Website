import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },  
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Users/ProfileView.vue')
  },  
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Users/CartView.vue')
  },  
  {
    path: '/userOrder',
    name: 'userOrder',
    component: () => import('../views/Users/UserOrderView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Admin/DashboardView.vue'),
  },  
  {
    path: '/approve',
    name: 'approve',
    component: () => import('../views/Admin/ApproveView.vue')
  },  
  {
    path: '/prodManage',
    name: 'prodManage',
    component: () => import('../views/Admin/ProdManageView.vue')
  },  {
    path: '/orderManage',
    name: 'orderManage',
    component: () => import('../views/Admin/OrderManageView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
