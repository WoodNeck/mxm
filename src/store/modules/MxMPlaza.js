import * as types from '../types'
import axios from 'axios'

const state = {
  mxmsInPlaza: [],
  users: []
}

const getters = {
  mxmsInPlaza: state => state.mxmsInPlaza,
  users: state => state.users
}

const mutations = {
  [types.MXMPLAZA_LOAD] (state, mxmsInPlaza) {
    state.mxmsInPlaza = mxmsInPlaza
  },
  [types.MXMPLAZA_USER_LOAD] (state, users) {
    state.users = users.data
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
  },
  MXMPLAZA_USER_LOAD ({ commit }) {
    axios
    .get('/api/users')
    .then(users => {
      commit(types.MXMPLAZA_USER_LOAD, users)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
