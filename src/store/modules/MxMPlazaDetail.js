import * as types from '../types'
import axios from 'axios'

const state = {
  mxm: []
}

const getters = {
  mxm: state => state.mxm
}

const mutations = {
  [types.MXM_PLAZA_DETAIL_LOAD] (state, mxm) {
    state.mxm = mxm
  }
}

const actions = {
  MXM_PLAZA_DETAIL_LOAD ({ commit }, id) {
    axios
    .get('/api/mxms/' + id)
    .then(res => res.data)
    .then(mxm => {
      commit(types.MXM_PLAZA_DETAIL_LOAD, mxm)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
