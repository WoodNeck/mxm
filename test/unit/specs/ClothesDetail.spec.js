import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import ClothesDetail from '@/components/ClothesDetail'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('ClothesDetail.vue', () => {
  let store
  let router

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store()
  })

  it('is instance of Vue', () => {
    const wrapper = shallow(ClothesDetail, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
