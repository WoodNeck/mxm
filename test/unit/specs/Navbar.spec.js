import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import Navbar from '@/components/Navbar'
import navbar from '@/store/modules/navbar'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('App.vue', () => {
  let store
  let router
  let mutations

  mutations = {
    [types.NAVBAR_UPDATE_SCROLL]: jest.fn()
  }

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store({
      mutations,
      state: {},
      modules: {
        navbar
      }
    })
  });

  it('should include 1 nav', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('should include nav-brand with logo and github', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    expect(wrapper.find('.navbar-brand').exists()).toBe(true)
    expect(wrapper.find('#mxm-github').attributes().href).toBe('https://github.com/WoodNeck/mxm')
  })
})
