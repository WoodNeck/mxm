import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import Navbar from '@/components/Navbar'
import navbar from '@/store/modules/navbar'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Navbar.vue', () => {
  let store
  let router
  let mutations

  mutations = {
    [types.NAVBAR_TOGGLE_BURGER]: jest.fn(),
    [types.NAVBAR_CLOSE_BURGER]: jest.fn(),
    [types.NAVBAR_CHANGE_PAGE]: jest.fn(),
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

  it('is a Vue instance', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should include 1 nav', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    expect(wrapper.find('nav').exists()).toBeTruthy()
  })

  it('should include nav-brand with logo and github', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    expect(wrapper.find('.navbar-brand').exists()).toBeTruthy()
    expect(wrapper.find('#mxm-logo').exists()).toBeTruthy()
    expect(wrapper.find('#mxm-github').attributes().href).toBe('https://github.com/WoodNeck/mxm')
  })

  it('should toggle burger when clicked', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    expect(wrapper.find('.navbar-burger').exists()).toBeTruthy()
    wrapper.find('.navbar-burger').trigger('click')
    expect(mutations[types.NAVBAR_TOGGLE_BURGER]).toBeCalled()
  })

  it('should close burger when clicked except github', () => {
    const wrapper = shallow(Navbar, { localVue, store, router })
    const navMenus = wrapper.findAll('.navbar-item')
    expect(navMenus.exists()).toBeTruthy()
    expect(navMenus.length).toBeGreaterThanOrEqual(4)
    const navMenusExceptGithub = navMenus.wrappers.filter(menu => !menu.find('#mxm-github').exists())
    navMenusExceptGithub.forEach(menu => {
      menu.trigger('click')
      expect(mutations[types.NAVBAR_TOGGLE_BURGER]).toBeCalled()
    })
  })
})
