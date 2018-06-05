import * as types from '../types'
import axios from 'axios'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

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
    .get('/api/mxms/')
    .then(res => res.data)
    .then(mxms => {
      commit(types.ALLMXMS_LOAD, mxms)
    })
  },

  ALLMXMS_SET_RECOMMEND ({ commit, dispatch }, checkedMxMs) {
    console.log(checkedMxMs)
    for (var i = 0; i < checkedMxMs.length; i++) {
      axios.patch('mxms/' + checkedMxMs[i] + '/', {
        is_on_recommendation: true
      })
      .then(res => {
        dispatch('ALLMXMS_LOAD')
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

  ALLMXMS_SET_EVAL ({ commit, dispatch }, checkedMxMs) {
    console.log(checkedMxMs)
    for (var i = 0; i < checkedMxMs.length; i++) {
      axios.patch('mxms/' + checkedMxMs[i] + '/', {
        is_on_evaluation: true
      })
      .then(res => {
        dispatch('ALLMXMS_LOAD')
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
