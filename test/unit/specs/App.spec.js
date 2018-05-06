import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import App from '@/App'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('App.vue', () => {
  let store
  let mutations
  let router

  mutations = {
    [types.NAVBAR_CHANGE_PAGE]: jest.fn()
  }

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store({
      mutations,
      state: {}
    })
  });

  it('is instance of Vue', () => {
    const wrapper = shallow(App, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('should init page with "/" by default.', () => {
    const wrapper = shallow(App, { localVue, store, router })
    expect(mutations[types.NAVBAR_CHANGE_PAGE]).toBeCalledWith({}, {path: '/'});
  });
})
