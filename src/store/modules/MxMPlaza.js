import * as types from '../types'
import axios from 'axios'

const state = {
  mxmsInPlaza: []
}

const getters = {
  mxmsInPlaza: state => state.mxmsInPlaza
}

const mutations = {
  [types.MXMPLAZA_LOAD] (state, mxmsInPlaza) {
    state.mxmsInPlaza = mxmsInPlaza
  }
}

const actions = {
  MXMPLAZA_LOAD ({
    commit
  }) {
    axios
    .get('/api/mxms/')
    .then(res => res.data)
    .then(mxmsInPlaza => {
      commit(types.MXMPLAZA_LOAD, mxmsInPlaza)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
