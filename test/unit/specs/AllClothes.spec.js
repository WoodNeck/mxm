import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import AllClothes from '@/components/AllClothes'
import allClothes from '@/store/modules/allClothes'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('AllClothes.vue', () => {
  let store
  let router
  let mutations

  mutations = {
    [types.ALLCLOTHES_LOAD]: jest.fn(),
    [types.TAGS_LOAD]: jest.fn()
  }

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store({
      mutations,
      state: {},
      modules: {
        allClothes
      }
    })
  })

  it('is instance of Vue', () => {
    const wrapper = shallow(AllClothes, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has 1 hero section', () => {
    const wrapper = shallow(AllClothes, { localVue, store, router })
    expect(wrapper.findAll('.hero').length).toBeGreaterThanOrEqual(1)
  })

  it('has title named All Clothes', () => {
    const wrapper = shallow(AllClothes, { localVue, store, router })
    expect(wrapper.find('.title').text()).toBe('All Clothes')
  })

  it('has subtitle named Check your clothes', () => {
    const wrapper = shallow(AllClothes, { localVue, store, router })
    expect(wrapper.find('.subtitle').text()).toBe('Check your clothes')
  })
})

