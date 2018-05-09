import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import Closet from '@/components/Closet'
import AllClothes from '@/components/AllClothes'
import AllMxMs from '@/components/AllMxMs'
import closet from '@/store/modules/closet'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Closet.vue', () => {
  let store
  let router
  let mutations

  mutations = {
    [types.CLOSET_CHANGE_MENU]: jest.fn()
  }

  beforeEach(() => {
    router = new VueRouter({
      routes: [
        {
          path: '/closet',
          redirect: '/closet/clothes/all',
          name: 'My Closet',
          component: Closet,
          children: [
            {
              path: 'clothes/all',
              component: AllClothes
            },
            {
              path: 'mxm/all',
              component: AllMxMs
            }
          ]
        }
      ]
    })
    store = new Vuex.Store({
      mutations,
      state: {},
      modules: {
        closet
      }
    })
  });

  it('is a Vue instance', () => {
    const wrapper = shallow(Closet, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should include 2 menus', () => {
    const wrapper = shallow(Closet, { localVue, store, router })
    expect(wrapper.find('#closet-menu-wrapper').findAll('a').length).toBe(2)
  })

  it('should contain content', () => {
    const wrapper = shallow(Closet, { localVue, store, router })
    expect(wrapper.find('#closet-content-wrapper').isEmpty()).not.toBeTruthy()
  })

  it('should set default menu to clothes/all', () => {
    const wrapper = shallow(Closet, { localVue, store, router })
    expect(mutations[types.CLOSET_CHANGE_MENU]).toBeCalled()
    expect(wrapper.vm.$route.path === '/closet/clothes/all')
  })

  it('should handle click event on menu', () => {
    const wrapper = shallow(Closet, { localVue, store, router })
    const menus = wrapper.findAll('a')
    menus.wrappers.forEach(menu => {
      menu.trigger('click')
      expect(expect(mutations[types.CLOSET_CHANGE_MENU]).toBeCalled())
    })
  })
})
