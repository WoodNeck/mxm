<template>
  <nav class="navbar is-fixed-top">
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
            <router-link to="/" class="button is-white is-outlined">
              <b-icon pack="fas" icon="home"></b-icon>
              <span>Home</span>
            </router-link>
          </span>
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
export default {
  computed () {

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
    background: transparent;
  }
  .navbar-item {
    color: #4c4c4c;
  }
</style>
