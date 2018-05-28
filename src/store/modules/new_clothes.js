import * as types from '../types'
import axios from 'axios'

const state = {
  tags: [],
  text: ""
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
  [types.NEW_CLOTHES_INIT] ({commit, state}) {
    axios.get('/api/tag/')
    .then(res => {
      state.tags = res.data
    })
    .catch(error => console.log(error))
  },
  [types.NEW_CLOTHES_SUBMIT] ({commit, state}, payload) {
    let file = payload.file
    let tags = payload.tags
    let formData = new FormData()

    formData.append('image', file)

    axios.post('/api/clothes', formData)
      .then(response => {

      })
      .catch(response => {})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
