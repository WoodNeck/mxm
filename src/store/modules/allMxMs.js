import * as types from '../types'
import axios from 'axios'

const state = {
  mxms: []
}

const getters = {
  mxms: state => state.mxms
}

const mutations = {
  [types.ALLMXMS_LOAD] (state, mxms) {
    state.mxms = mxms
  }
  // [types.ALLMXMS_SET_RECOMMEND] (state, mxms) {
  //   state.mxms = mxms
  // },
  // [types.ALLMXMS_SET_EVAL] (state, mxms) {
  //   state.mxms = mxms
  // }
}

const actions = {
  ALLMXMS_LOAD ({
    commit
  }) {
    axios
    .get('/api/mxms/')
    .then(res => res.data)
    .then(mxms => {
      commit(types.ALLMXMS_LOAD, mxms)
    })
  }
  // ALLMXMS_SET_RECOMMEND ({ commit }, checkedMxMs) {
  //   axios
  //   .post('/api/mxms/' + checkedMxMs)
  //   .then()
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
