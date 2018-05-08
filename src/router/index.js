import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import AllClothesWrapper from '@/components/AllClothesWrapper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/closet/clothes/all',
      name: 'All Clothes',
      component: AllClothesWrapper
    }
  ]
})
