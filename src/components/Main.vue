<template>
  <div>
    <section class="hero is-fullheight is-info">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Mix X Match
          </h1>
          <h2 class="subtitle">
            Build your own closet on web
          </h2>
        </div>
      </div>
      <div class="hero-foot has-text-centered">
        <i class="fas fa-angle-down fa-5x"></i>
      </div>
    </section>
    <section class="hero is-fullheight is-danger">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Mix X Match
          </h1>
          <h2 class="subtitle">
            Build your own closet on web
          </h2>
        </div>
      </div>
    </section>
    <section class="hero is-fullheight is-alert">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Mix X Match
          </h1>
          <h2 class="subtitle">
            Build your own closet on web
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  h1.title {
    font-family: 'Luckiest Guy', cursive;
  }
  h2.subtitle {
    font-family: 'Shrikhand', cursive;
  }
  .hero.is-info {
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url('../assets/images/main_bg.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
