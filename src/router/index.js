import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:
  [
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'main', auth: false},
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {layout: 'main', auth: false, reg: true},
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/convert',
      name: 'Convert',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/Convert.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const rAuth = to.matched.some(record => record.meta.auth)
  if (rAuth && !currentUser) {
    next('/')
    alert("Для перехода на эту страницу необходимо авторизоваться!");
  } else {
    next()
  }
  if (currentUser && to.matched.some(record => record.meta.reg)) {
    next('/')
  }
})

export default router
