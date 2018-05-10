import * as types from '../types'

const state = {
  closetActiveMenu: null
}

const getters = {
  closetActiveMenu: (state, getters) => {
    return state.closetActiveMenu
  }
}

const mutations = {
  [types.CLOSET_CHANGE_MENU] (state, payload) {
    state.closetActiveMenu = payload.path.split('/')[2]
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
