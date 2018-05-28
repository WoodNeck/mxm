import Vue from 'vue'
import Vuex from 'vuex'
import navbar from './modules/navbar'
import closet from './modules/closet'
import allClothes from './modules/allClothes'
import allMxMs from './modules/allMxMs'
import clothesDetail from './modules/clothesDetail'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    navbar,
    closet,
    allClothes,
    allMxMs,
    clothesDetail
  },
  strict: debug
})
