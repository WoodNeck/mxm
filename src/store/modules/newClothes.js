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
      for (let i = 0; i < res.data.length; i += 1) {
        res.data[i].index = i
      }
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
  [types.NEW_CLOTHES_SUBMIT] ({rootState, rootGetters}, payload) {
    let file = payload.file
    let tags = payload.tags
    let toast = payload.toast
    let snackbar = payload.snackbar
    let router = payload.router

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
    formData.append('tag', tags.map(tag => {
      return tag.index
    }))

    let sessionid = Cookies.get('sessionid')
    Cookies.remove('sessionid')

    axios.post('/api/clothes/',
      formData
    )
    .then(response => {
      Cookies.set('sessionid', sessionid)
      rootState.allClothes.clothes = [...rootState.allClothes.clothes, response.data]
      router.go(-1)
      toast.open({
        duration: 5000,
        message: `Cloth registered successfully`,
        position: 'is-top',
        type: 'is-success'
      })
    })
    .catch(error => {
      Cookies.set('sessionid', sessionid)
      console.log(error)
      toast.open({
        duration: 5000,
        message: `Something wrong happened!`,
        position: 'is-top',
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
