<template>
  <nav :class="navClasses">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item" @click="closeBurger">
          <router-link to="/" :class="navBrandClasses">
            <span id="mxm-logo">MxM</span>
          </router-link>
        </span>
        <span class="navbar-item">
          <a href="https://github.com/WoodNeck/mxm" :class="navBrandClasses">
            <b-icon pack="fab" icon="github"></b-icon>
          </a>
        </span>
        <a role="button" class="navbar-burger" :class="[navBrandClasses, navBurgerClasses]" @click="toggleBurger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenuHeroA" class="navbar-menu" :class="navBurgerClasses">
        <div class="navbar-end">
          <span class="navbar-item" @click="closeBurger">
            <router-link to="/closet" :class="navButtonClasses">
              <b-icon pack="fas" icon="user"></b-icon>
              <span>My Closet</span>
            </router-link>
          </span>
          <span class="navbar-item" @click="closeBurger">
            <router-link to="/plaza" :class="navButtonClasses">
              <b-icon pack="fas" icon="users"></b-icon>
              <span>MxM Plaza</span>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { NAVBAR_SET_BACKGROUND,
         NAVBAR_UNSET_BACKGROUND,
         NAVBAR_TOGGLE_BURGER,
         NAVBAR_CLOSE_BURGER } from '@/store/types'

export default {
  computed: {
    ...mapGetters({
      navClasses: 'navClasses',
      navBrandClasses: 'navBrandClasses',
      navBurgerClasses: 'navBurgerClasses',
      navButtonClasses: 'navButtonClasses'
    })
  },

  data () {
    return {
      scrollPosition: null
    }
  },

  methods: {
    toggleBurger () {
      this.$store.commit(NAVBAR_TOGGLE_BURGER)
    },

    closeBurger () {
      this.$store.commit(NAVBAR_CLOSE_BURGER)
    },

    updateScroll () {
      this.scrollPosition = window.scrollY
      const height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
      if (this.scrollPosition >= height) {
        this.$store.commit(NAVBAR_SET_BACKGROUND)
      } else {
        this.$store.commit(NAVBAR_UNSET_BACKGROUND)
      }
    }
  },

  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },

  destroy () {
    window.removeEventListener('scroll', this.updateScroll)
  }
}
</script>

<style scoped>
  #mxm-logo {
    font-family: 'Luckiest Guy', cursive;
  }
  .navbar.transparent {
    background-color: transparent;
  }
  .navbar.half-alpha {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: background-color 300ms ease-in;
    -moz-transition: background-color 300ms ease-in;
    -o-transition: background-color 300ms ease-in;
    -ms-transition: background-color 300ms ease-in;
    transition: background-color 300ms ease-in;
  }
</style>
