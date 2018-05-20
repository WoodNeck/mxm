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
}

const actions = {
  ALLMXMS_LOAD ({
    commit
  }) {
    axios
    .get('http://localhost:8000/api/mxms/')
    .then(res => res.data)
    .then(mxms => {
      commit(types.ALLMXMS_LOAD, mxms)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}