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
  [types.ALLCLOTHES_CLOTHES_LOAD] (state, clothes) {
    state.clothes = clothes
  },
  [types.ALLCLOTHES_TAGS_LOAD] (state, tags) {
    state.tags = tags
  }
}

const actions = {
  [types.ALLCLOTHES_LOAD] ({commit, rootGetters}, payload) {
    let toast = payload.toast
    let page = payload.page
    let userId = rootGetters.user.id

    axios.get(String.format('/api/clothes/user={0}/page={1}', userId, page))
    .then(res => {
      let clothes = res.data
      commit(types.ALLCLOTHES_LOAD, clothes)
    })
    .catch(erro => {
      console.log(error.response)
      toast.open({
        duration: 5000,
        message: `Couldn't retrieve tags info`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    })

    axios.get('/api/tag/')
    .then(res => {
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i].index = i
      }
      let tags = res.data
      commit(types.ALLCLOTHES_TAGS_LOAD, tags)
    })
    .catch(error => {
      console.log(error.response)
      toast.open({
        duration: 5000,
        message: `Couldn't retrieve tags info`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
