import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Closet from '@/components/Closet'
import AllClothes from '@/components/AllClothes'
import AllMxMs from '@/components/AllMxMs'

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
      redirect: '/closet/all',
      name: 'My Closet',
      component: Closet,
      children: [
        {
          path: 'all',
          component: AllClothes
        },
        {
          path: 'mxm',
          component: AllMxMs
        }
      ]
    }
  ]
})
