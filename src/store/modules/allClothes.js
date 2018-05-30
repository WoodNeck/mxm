import * as types from '../types'
import axios from 'axios'

const state = {
  clothes: []
}

const getters = {
  clothes: state => state.clothes
}

const mutations = {
  [types.ALLCLOTHES_LOAD] (state, clothes) {
    state.clothes = clothes
  }
}

const actions = {
  ALLCLOTHES_LOAD ({
    commit
  }) {
    axios
    .get('/api/clothes/')
    .then(res => res.data)
    .then(clothes => {
      commit(types.ALLCLOTHES_LOAD, clothes)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
