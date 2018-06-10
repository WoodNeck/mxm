import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import AllMxMs from '@/components/AllMxMs'
import allMxMs from '@/store/modules/allMxMs'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('AllMxMs.vue', () => {
  let store
  let router
  let mutations

  mutations = {
    [types.ALLMXMS_LOAD]: jest.fn()
  }

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store({
      mutations,
      state: {},
      modules: {
        allMxMs
      }
    })
  })

  it('is instance of Vue', () => {
    const wrapper = shallow(AllMxMs, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
