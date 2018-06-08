import * as types from '../types'
import axios from 'axios'

const state = {
  clothes: [],
  tags: []
}

const getters = {
  clothes: state => state.clothes,
  tags: state => state.tags
}

const mutations = {
  [types.ALLCLOTHES_LOAD] (state, clothes) {
    state.clothes = clothes
  },
  [types.TAGS_LOAD] (state, tags) {
    state.tags = tags
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
