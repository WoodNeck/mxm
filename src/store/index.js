import Vue from 'vue'
import Vuex from 'vuex'
import navbar from './modules/navbar'
import closet from './modules/closet'
import allClothes from './modules/allClothes'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    navbar,
    closet,
    allClothes
  },
  strict: debug
})
