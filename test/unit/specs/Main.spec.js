import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallow, createLocalVue } from 'vue-test-utils'
import Main from '@/components/Main'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Main.vue', () => {
  let store
  let router

  beforeEach(() => {
    router = new VueRouter()
    store = new Vuex.Store()
  });

  it('is instance of Vue', () => {
    const wrapper = shallow(Main, { localVue, store, router })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has 3 hero section', () => {
    const wrapper = shallow(Main, { localVue, store, router })
    expect(wrapper.findAll('.hero').length).toBeGreaterThanOrEqual(3)
  })

  it('has title named Mix X Match', () => {
    const wrapper = shallow(Main, { localVue, store, router })
    expect(wrapper.find('.title').text()).toBe('Mix X Match')
  })
})
