import Vue from 'vue'
import Router from 'vue-router'
import UI001 from '@/pages/UI001'
import Welcome from '@/pages/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UI001',
      component: UI001
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
