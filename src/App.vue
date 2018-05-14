<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { NAVBAR_CHANGE_PAGE } from '@/store/types'
export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  },
  watch: {
    $route (to, from) {
      this.$store.commit(NAVBAR_CHANGE_PAGE, {
        path: to.path
      })
    }
  },
  mounted () {
    this.$store.commit(NAVBAR_CHANGE_PAGE, {
      path: this.$route.path
    })
  }
}
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  $primary: #00d1b2;
  $primary-invert: findColorInvert($primary);

  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert)
  );

  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  .is-horizontal-center {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  }
</style>
