import * as types from '../types'
import axios from 'axios'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

const state = {
  mxms: [],
  clothes: [],
  page: 1,
  total: 1,
  isLoading: false
}

const getters = {
  mxms: state => state.mxms,
  clothes: state => state.clothes,
  page: stage => state.page,
  total: state => state.total,
  isLoading: state => state.isLoading
}

const mutations = {
  [types.ALLMXMS_MXMS_LOAD] (state, payload) {
    state.mxms = payload.mxms
    state.total = payload.total
  },
  [types.ALLMXMS_CLOTHES_LOAD] (state, clothes) {
    state.clothes = clothes
  },
  [types.ALLMXMS_MXMS_ADD] (state, mxm) {
    state.mxms = {...state.mxms, mxm}
    state.total += 1
  },
  [types.ALLMXMS_SET_PAGE] (state, page) {
    state.page = page
  },
  [types.ALLMXMS_SET_LOADING] (state, value) {
    state.isLoading = value
  }
}

const actions = {
  [types.ALLMXMS_LOAD] ({ state, commit, dispatch, rootGetters }, payload) {
    const userId = rootGetters.user.id
    const page = payload.page

    commit(types.ALLMXMS_SET_LOADING, true)

    if (userId < 0) {
      setTimeout(() => {
        dispatch(types.ALLMXMS_LOAD, payload)
      }, 1000)
      return
    }

    axios
    .get(`/api/mxms/user=${userId}/page=${page}`)
    .then(res => {
      console.log(res.data)
      let total = res.data[0]
      if (total > 0) {
        commit(types.ALLMXMS_MXMS_LOAD, {
          total: total,
          mxms: res.data.slice(1, res.data.length)
        })
        commit(types.ALLMXMS_SET_PAGE, page)
      }
      commit(types.ALLMXMS_SET_LOADING, false)
    })

    axios
    .get(`/api/clothes`)
    .then(res => {
      commit(types.ALLMXMS_CLOTHES_LOAD, res.data)
    })
  },

  ALLMXMS_SET_RECOMMEND ({ state, commit, dispatch }, checkedMxMs) {
    for (var i = 0; i < checkedMxMs.length; i++) {
      axios.patch('/api/mxms/' + checkedMxMs[i] + '/', {
        is_on_recommendation: true
      })
      .then(res => {
        dispatch(types.ALLMXMS_LOAD, {
          page: 1
        })
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    }
  },

  ALLMXMS_SET_EVAL ({ state, commit, dispatch }, checkedMxMs) {
    console.log(checkedMxMs)
    for (var i = 0; i < checkedMxMs.length; i++) {
      axios.patch('/api/mxms/' + checkedMxMs[i] + '/', {
        is_on_evaluation: true
      })
      .then(res => {
        dispatch(types.ALLMXMS_LOAD, {
          page: 1
        })
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
