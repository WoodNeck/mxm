import * as types from '../types'
import axios from 'axios'

const state = {
  cloth: []
}

const getters = {
  cloth: state => state.cloth
}

const mutations = {
  [types.CLOTHES_LOAD] (state, cloth) {
    state.cloth = cloth
  }
}

const actions = {
  CLOTHES_LOAD ({ commit }, id) {
    axios
    .get('http://localhost:8000/api/clothes/' + id)
    .then(res => res.data)
    .then(cloth => {
      commit(types.CLOTHES_LOAD, cloth)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
