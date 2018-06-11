import * as types from '../types'
import axios from 'axios'

const state = {
  cloth: []
}

const getters = {
  cloth: state => state.cloth,
  tags: state => state.tags
}

const mutations = {
  [types.CLOTHES_LOAD] (state, cloth) {
    state.cloth = cloth
  },
  [types.TAGS_LOAD] (state, tags) {
    state.tags = tags
  }
}

const actions = {
  CLOTHES_LOAD ({ commit }, id) {
    axios
    .get('/api/clothes/' + id)
    .then(res => res.data)
    .then(cloth => {
      commit(types.CLOTHES_LOAD, cloth)
    })
  },
  TAGS_LOAD ({ commit }) {
    axios
    .get('/api/tag/')
    .then(res => res.data)
    .then(tags => {
      commit(types.TAGS_LOAD, tags)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
