import * as types from '../types'
import axios from 'axios'
import Cookies from 'js-cookie'

const state = {
  tags: [],
  text: ''
}

const getters = {
  filteredTags: state => {
    return state.tags.filter(tag =>
      tag.content.toLowerCase().indexOf(state.text.toLowerCase()) >= 0
    )
  }
}

const mutations = {
  [types.NEW_CLOTHES_TAG_INPUT] (state, text) {
    state.text = text
  }
}

const actions = {
  [types.NEW_CLOTHES_INIT] ({commit, state}, toast) {
    axios.get('/api/tag/')
    .then(res => {
      state.tags = res.data
    })
    .catch(error => {
      console.log(error.response)
      toast.open({
        duration: 5000,
        message: `Couldn't connect to backend server`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    })
  },
  [types.NEW_CLOTHES_SUBMIT] ({rootGetters}, payload) {
    let file = payload.file
    let tags = payload.tags
    let snackbar = payload.snackbar

    if (!file) {
      snackbar.open({
        message: 'You should provide cloth file',
        type: 'is-danger',
        position: 'is-top'
      })
      return
    }

    if (tags.length <= 0) {
      snackbar.open({
        message: 'You should provide least 1 tag',
        type: 'is-danger',
        position: 'is-top'
      })
      return
    }

    let formData = new FormData()
    formData.append('image', file)
    formData.append('owner', rootGetters.user.id)
    //formData.append('tag', tags)

    let sessionid = Cookies.get('sessionid')
    Cookies.remove('sessionid')

    axios.post('/api/clothes/',
      formData,
      {
        withCredentials: true
      }
    )
    .then(response => {
      Cookies.set('sessionid', sessionid)
      console.log(document.cookie)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
