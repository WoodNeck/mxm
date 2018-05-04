import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Closet from '@/components/Closet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/closet',
      name: 'My Closet',
      component: Closet
    }
  ]
})
