<template>
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        Clothes Detail
      </h1>
      <h2 class="subtitle">
        Check your clothes' detail
      </h2>
      <br/>
    </div>

    <div class="container has-text-centered">
      <div id="clothes-detail-wrapper">
        <img class="pic" v-bind:src="cloth.image" width='300'><br/><br/>
        CLOTHES #{{ cloth.id }} <br/>
        Added at {{ cloth.created_time }} <br/>
        {{ cloth.tag }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('CLOTHES_LOAD', this.$route.params.id)
  },
  computed: {
    cloth () {
      return this.$store.getters.cloth
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
