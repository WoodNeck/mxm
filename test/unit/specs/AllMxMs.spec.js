import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import AllMxMs from '@/components/AllMxMs'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('AllMxMs.vue', () => {
  let store
  let router

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store()
  })

  it('is instance of Vue', () => {
    const wrapper = shallow(AllMxMs, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has 1 hero section', () => {
    const wrapper = shallow(AllMxMs, { localVue, store, router })
    expect(wrapper.findAll('.hero').length).toBeGreaterThanOrEqual(1)
  })

  it('has title named All MxMs', () => {
    const wrapper = shallow(AllMxMs, { localVue, store, router })
    expect(wrapper.find('.title').text()).toBe('All MxMs')
  })

  it('has subtitle named Check your MxMs', () => {
    const wrapper = shallow(AllMxMs, { localVue, store, router })
    expect(wrapper.find('.subtitle').text()).toBe('Check your MxMs')
  })
})