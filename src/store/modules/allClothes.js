import * as types from '../types'
import axios from 'axios'

const state = {
  clothes: [],
  tags: [],
  total: 1,
  page: 1,
  isLoading: false
}

const getters = {
  user_clothes: state => state.clothes,
  tags: state => state.tags,
  total: state => state.total,
  page: state => state.page,
  isLoading: state => state.isLoading
}

const mutations = {
  [types.ALLCLOTHES_CLOTHES_LOAD] (state, payload) {
    state.total = payload.total
    state.clothes = payload.clothes
  },
  [types.ALLCLOTHES_TAGS_LOAD] (state, tags) {
    state.tags = tags
  },
  [types.ALLCLOTHES_CLOTHES_ADD] (state, cloth) {
    state.clothes = {...state.clothes, cloth}
    state.total += 1
  },
  [types.ALLCLOTHES_SET_PAGE] (state, page) {
    state.page = page
  },
  [types.ALLCLOTHES_SET_LOADING] (state, value) {
    state.isLoading = value
  }
}

const actions = {
  [types.ALLCLOTHES_LOAD] ({state, commit, dispatch, rootGetters}, payload) {
    const toast = payload.toast
    const page = payload.page
    const userId = rootGetters.user.id

    commit(types.ALLCLOTHES_SET_LOADING, true)

    if (userId < 0) {
      setTimeout(() => {
        dispatch(types.ALLCLOTHES_LOAD, payload)
      }, 1000)
      return
    }

    axios.get(`/api/clothes/user=${userId}/page=${page}`)
    .then(res => {
      let total = res.data[0]
      if (total > 0) {
        commit(types.ALLCLOTHES_CLOTHES_LOAD, {
          total: total,
          clothes: res.data.slice(1, res.data.length)
        })
        commit(types.ALLCLOTHES_SET_PAGE, page)
      }
      commit(types.ALLCLOTHES_SET_LOADING, false)
    })
    .catch(error => {
      console.log(error.response)
      toast.open({
        duration: 5000,
        message: `Couldn't retrieve user clothes`,
        position: 'is-bottom',
        type: 'is-danger'
      })
      commit(types.ALLCLOTHES_SET_LOADING, false)
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
