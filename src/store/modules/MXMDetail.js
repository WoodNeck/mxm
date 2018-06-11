import * as types from '../types'
import axios from 'axios'

const state = {
  mxm: []
}

const getters = {
  mxm: state => state.mxm
}

const mutations = {
  [types.MXM_LOAD] (state, mxm) {
    state.mxm = mxm
  },
  [types.MXM_CHANGE] (state, mxm) {
    state.mxm = mxm
  }
}

const actions = {
  MXM_LOAD ({ commit }, id) {
    axios
    .get('/api/mxms/' + id)
    .then(res => res.data)
    .then(mxm => {
      commit(types.MXM_LOAD, mxm)
    })
  },
  MXM_CHANGE ({ commit }, mxm) {
    commit(types.MXM_CHANGE, mxm)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
