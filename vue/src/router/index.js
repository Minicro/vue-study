import Vue from 'vue'
import Router from 'vue-router'
import UI001 from '@/pages/UI001'
import Welcome from '@/pages/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/UI001',
      name: 'UI001',
      component: UI001
    },
  ]
})
