import navbar from '@/store/modules/navbar'
import * as types from '@/store/types'

const defaultState = {
  isMainPage: true,
  scrolled: false,
  burgerOpen: false
}

test('navClasses should always include navbar and is-fixed-top', () => {
  expect(navbar.getters.navClasses(defaultState).navbar).toBeTruthy()
  expect(navbar.getters.navClasses(defaultState)['is-fixed-top']).toBeTruthy()
})

test('navClasses case of main page, burger not opened and not scrolled', () => {
  const state = {
    isMainPage: true,
    scrolled: false,
    burgerOpen: false
  }
  expect(navbar.getters.navClasses(state)['is-background-white']).not.toBeTruthy()
  expect(navbar.getters.navClasses(state)['transparent']).toBeTruthy()
  expect(navbar.getters.navClasses(state)['half-alpha']).not.toBeTruthy()
})

test('navClasses case of main page, burger not opened and scrolled', () => {
  const state = {
    isMainPage: true,
    scrolled: true,
    burgerOpen: false
  }
  expect(navbar.getters.navClasses(state)['is-background-white']).not.toBeTruthy()
  expect(navbar.getters.navClasses(state)['transparent']).not.toBeTruthy()
  expect(navbar.getters.navClasses(state)['half-alpha']).toBeTruthy()
})

test('navClasses case of main page, burger opened and not scrolled', () => {
  const state = {
    isMainPage: true,
    scrolled: true,
    burgerOpen: true
  }
  expect(navbar.getters.navClasses(state)['is-background-white']).toBeTruthy()
  expect(navbar.getters.navClasses(state)['transparent']).not.toBeTruthy()
  expect(navbar.getters.navClasses(state)['half-alpha']).not.toBeTruthy()
})

test('navClasses case of other pages', () => {
  let state = {
    isMainPage: false,
    scrolled: true,
    burgerOpen: true
  }
  for (let i = 0; i < 4; i += 1) {
    if (i % 2 == 0) state.scrolled = !state.scrolled
    if (i % 2 == 1) state.burgerOpen = !state.burgerOpen
    expect(navbar.getters.navClasses(state)['is-background-white']).toBeTruthy()
    expect(navbar.getters.navClasses(state)['transparent']).not.toBeTruthy()
    expect(navbar.getters.navClasses(state)['half-alpha']).not.toBeTruthy()
  }
})

test('navBurgerClasses activity test', () => {
  let state = {
    burgerOpen: true
  }
  expect(navbar.getters.navBurgerClasses(state)['is-active']).toBeTruthy()

  state.burgerOpen = false;
  expect(navbar.getters.navBurgerClasses(state)['is-active']).not.toBeTruthy()
})

test('change page state mutation test', () => {
  const state = {
    isMainPage: true,
    scrolled: false,
    burgerOpen: false
  }

  for (let i = 0; i < 8; i += 1) {
    if (i % 2 == 0) state.scrolled = !state.scrolled
    if (i % 2 == 1) state.burgerOpen = !state.burgerOpen
    if (i % 4 == 0) state.isMainPage = !state.isMainPage

    let payload = {path: '/'}
    navbar.mutations[types.NAVBAR_CHANGE_PAGE](state, payload)
    expect(state.isMainPage).toBeTruthy()

    payload = {path: ''}
    navbar.mutations[types.NAVBAR_CHANGE_PAGE](state, payload)
    expect(state.isMainPage).toBeTruthy()

    payload = {path: 'qwerty'}
    navbar.mutations[types.NAVBAR_CHANGE_PAGE](state, payload)
    expect(state.isMainPage).toBeTruthy()

    payload = {path: '/closet'}
    navbar.mutations[types.NAVBAR_CHANGE_PAGE](state, payload)
    expect(state.scrolled).not.toBeTruthy()
    expect(state.isMainPage).not.toBeTruthy()
  }
})

test('toggle burger test of all state cases', () => {
  const state = {
    isMainPage: true,
    scrolled: false,
    burgerOpen: false
  }

  for (let i = 0; i < 8; i += 1) {
    if (i % 2 == 0) state.scrolled = !state.scrolled
    if (i % 2 == 1) state.burgerOpen = !state.burgerOpen
    if (i % 4 == 0) state.isMainPage = !state.isMainPage

    const prevState = state.burgerOpen
    navbar.mutations[types.NAVBAR_TOGGLE_BURGER](state)
    expect(prevState).not.toBe(state.burgerOpen)
  }
})

test('close burger test of all state cases', () => {
  const state = {
    isMainPage: true,
    scrolled: false,
    burgerOpen: false
  }

  for (let i = 0; i < 8; i += 1) {
    if (i % 2 == 0) state.scrolled = !state.scrolled
    if (i % 2 == 1) state.burgerOpen = !state.burgerOpen
    if (i % 4 == 0) state.isMainPage = !state.isMainPage

    navbar.mutations[types.NAVBAR_CLOSE_BURGER](state)
    expect(state.burgerOpen).not.toBeTruthy()
  }
})

test('update scroll test', () => {
  const state = {
    isMainPage: true,
    scrolled: false,
    burgerOpen: false
  }

  for (let i = 0; i < 8; i += 1) {
    if (i % 2 == 0) state.scrolled = !state.scrolled
    if (i % 2 == 1) state.burgerOpen = !state.burgerOpen
    if (i % 4 == 0) state.isMainPage = !state.isMainPage

    const heights = [...Array(15).keys()].map(x => x * 100)


    heights.forEach(height => {
      window.innerHeight = height

      window.scrollY = height
      navbar.mutations[types.NAVBAR_UPDATE_SCROLL](state)
      expect(state.scrolled).toBeTruthy()

      window.scrollY = height - 100
      navbar.mutations[types.NAVBAR_UPDATE_SCROLL](state)
      expect(state.scrolled).not.toBeTruthy()

      window.scrollY = height + 100
      navbar.mutations[types.NAVBAR_UPDATE_SCROLL](state)
      expect(state.scrolled).toBeTruthy()

      window.scrollY = height * 2
      navbar.mutations[types.NAVBAR_UPDATE_SCROLL](state)
      expect(state.scrolled).toBeTruthy()
    })
  }
})
