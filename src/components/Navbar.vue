<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a>
          <img class="mxm-logo" src="@/assets/logo.png" alt="Logo">
        </a>
      </div>
      <div id="navbarMenuHeroA" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item is-active">
            Home
          </a>
          <a class="navbar-item">
            My Closet
          </a>
          <a class="navbar-item">
            MxM Plaza
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mxm-logo {
    max-height: 5rem;
  }
</style>
