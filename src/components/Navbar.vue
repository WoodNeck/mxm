<template>
  <nav :class="navClasses" id="nav">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <router-link to="/" class="has-text-white">
            <span id="mxm-logo">MxM</span>
          </router-link>
        </span>
        <span class="navbar-item">
          <a href="https://github.com/WoodNeck/mxm" class="has-text-white" >
            <b-icon pack="fab" icon="github"></b-icon>
          </a>
        </span>
        <a role="button" class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenuHeroA" class="navbar-menu">
        <div class="navbar-end">
          <span class="navbar-item">
            <router-link to="/closet" class="button is-white is-outlined">
              <b-icon pack="fas" icon="user"></b-icon>
              <span>My Closet</span>
            </router-link>
          </span>
          <span class="navbar-item">
            <router-link to="/plaza" class="button is-white is-outlined">
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
import {NAVBAR_SET_BACKGROUND, NAVBAR_UNSET_BACKGROUND} from '@/store/types'

export default {
  computed: {
    ...mapGetters({
      navClasses: 'navClasses'
    })
  },

  data () {
    return {
      scrollPosition: null
    }
  },

  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mxm-logo {
    font-family: 'Luckiest Guy', cursive;
  }
  #mxm-logo:hover {
    background: transparent;
  }
  .navbar {
    background-color: transparent;
    -webkit-transition: background-color 300ms ease-in;
    -moz-transition: background-color 300ms ease-in;
    -o-transition: background-color 300ms ease-in;
    -ms-transition: background-color 300ms ease-in;
    transition: background-color 300ms ease-in;
  }
  .navbar-item {
    color: #4c4c4c;
  }
  .scrolled {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: background-color 300ms ease-in;
    -moz-transition: background-color 300ms ease-in;
    -o-transition: background-color 300ms ease-in;
    -ms-transition: background-color 300ms ease-in;
    transition: background-color 300ms ease-in;
  }
</style>
