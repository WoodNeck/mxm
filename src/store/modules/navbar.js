import * as types from '../types'
import axios from 'axios'

const state = {
  user: {
    id: -1,
    username: ''
  },
  isMainPage: true,
  scrolled: false,
  burgerOpen: false
}

const getters = {
  user: (state) => {
    return state.user
  },
  navClasses: (state, getters) => {
    return {
      'navbar': true,
      'is-fixed-top': true,
      'is-background-white': !state.isMainPage || state.burgerOpen,
      'transparent': state.isMainPage && !state.scrolled && !state.burgerOpen,
      'half-alpha': state.isMainPage && state.scrolled && !state.burgerOpen
    }
  },
  navBrandClasses: (state, getters) => {
    return {
      'has-text-white': state.isMainPage && !state.burgerOpen,
      'has-text-grey-dark': !state.isMainPage || state.burgerOpen
    }
  },
  navBurgerClasses: (state, getters) => {
    return {
      'is-active': state.burgerOpen
    }
  },
  navButtonClasses: (state, getters) => {
    return {
      'button': !state.burgerOpen,
      'is-outlined': state.isMainPage && !state.burgerOpen,
      'is-white': !state.isMainPage || !state.burgerOpen,
      'has-text-grey-dark': !state.isMainPage || state.burgerOpen
    }
  }
}

const mutations = {
  [types.NAVBAR_CHANGE_PAGE] (state, payload) {
    const urlRegex = /^\/((\w)\/)?/
    if (urlRegex.test(payload.path)) {
      state.currentPage = payload.path
      const html = document.documentElement
      if (payload.path === '/') {
        html.classList.remove('has-navbar-fixed-top')
        state.isMainPage = true
      } else {
        html.classList.add('has-navbar-fixed-top')
        state.scrolled = false
        state.isMainPage = false
      }
    }
  },
  [types.NAVBAR_TOGGLE_BURGER] (state) {
    state.burgerOpen = !state.burgerOpen
  },
  [types.NAVBAR_CLOSE_BURGER] (state) {
    state.burgerOpen = false
  },
  [types.NAVBAR_UPDATE_SCROLL] (state) {
    const height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
    if (window.scrollY >= height) {
      state.scrolled = true
    } else {
      state.scrolled = false
    }
  }
}

const actions = {
  [types.NAVBAR_INIT] ({commit, state}, toast) {
    axios.get('/api/myid/')
    .then(res => {
      state.user = res.data
      console.log(res.data)
    })
    .catch(error => {
      toast.open({
        duration: 5000,
        message: `Failed to retrieve user info`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
