// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Buefy from 'buefy'
import VueScrollReveal from 'vue-scroll-reveal'
import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal',
  duration: 800,
  scale: 1,
  distance: '10px',
  mobile: false
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
