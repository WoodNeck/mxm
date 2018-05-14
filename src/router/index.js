import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Closet from '@/components/Closet'
import AllClothes from '@/components/AllClothes'
import AllMxMs from '@/components/AllMxMs'
import ClothesDetail from '@/components/ClothesDetail'

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
      redirect: '/closet/clothes/all',
      name: 'My Closet',
      component: Closet,
      children: [
        {
          path: 'clothes/all',
          component: AllClothes
        },
        {
          path: 'clothes/detail',
          component: ClothesDetail
        },
        {
          path: 'mxm/all',
          component: AllMxMs
        }
      ]
    }
  ]
})
