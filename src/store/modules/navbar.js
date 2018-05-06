import * as types from '../types'

const state = {
  currentPage: null,
  scrolled: false
}

const getters = {
  navClasses: (state, getters) => {
    return {
      'navbar': true,
      'is-fixed-top': true,
      'scrolled': state.scrolled
    }
  }
}

const mutations = {
  [types.CHANGE_PAGE] (state, payload) {
    state.currentPage = payload.pageName
    const html = document.documentElement
    if (state.currentPage === '/') {
      html.classList.remove('has-navbar-fixed-top')
    } else {
      html.classList.add('has-navbar-fixed-top')
      state.scrolled = false
    }
  },
  [types.NAVBAR_SET_BACKGROUND] (state) {
    if (state.currentPage === '/') {
      state.scrolled = true
    }
  },
  [types.NAVBAR_UNSET_BACKGROUND] (state) {
    state.scrolled = false
  }
}

const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
