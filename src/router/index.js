import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from '../views/foods.vue'
import FoodDetail from '../views/foodDetail.vue'
import Keranjang from '../views/keranjang.vue'
import pesananSukses from '../views/pesananSukses.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods 
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: FoodDetail 
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang 
  },
  {
    path: '/pesananSukses',
    name: 'pesananSukses',
    component: pesananSukses 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
