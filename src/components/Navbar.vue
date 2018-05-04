<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img class="mxm-logo" src="@/assets/images/logo.png" alt="MxM">
        </router-link>
        <a class="navbar-item" href="https://github.com/WoodNeck/mxm">
          <b-icon pack="fab" icon="github"></b-icon>
        </a>
        <a role="button" class="navbar-burger is-active" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenuHeroA" class="navbar-menu is-active">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item is-active">Home</router-link>
          <router-link to="/closet" class="navbar-item is-active">My Closet</router-link>
          <router-link to="/plaza" class="navbar-item is-active">MxM Plaza</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar-item {
    color: #4c4c4c;
  }

</style>
