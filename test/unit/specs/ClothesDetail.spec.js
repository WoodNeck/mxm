import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import ClothesDetail from '@/components/ClothesDetail'
import clothesDetail from '@/store/modules/clothesDetail'
import * as types from '@/store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('ClothesDetail.vue', () => {
  let store
  let router
  let mutations

  mutations = {
    [types.CLOTHES_LOAD]: jest.fn(),
    [types.TAGS_LOAD]: jest.fn()
  }

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store({
      mutations,
      state: {},
      modules: {
        clothesDetail
      }
    })
  })

  it('is instance of Vue', () => {
    const wrapper = shallow(ClothesDetail, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has 1 hero section', () => {
    const wrapper = shallow(ClothesDetail, { localVue, store, router })
    expect(wrapper.findAll('.hero').length).toBeGreaterThanOrEqual(1)
  })

  it('has title named All MxMs', () => {
    const wrapper = shallow(ClothesDetail, { localVue, store, router })
    expect(wrapper.find('.title').text()).toBe('Clothes Detail')
  })
})
