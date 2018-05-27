<template>
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        All Clothes
      </h1>
      <h2 class="subtitle">
        Check your clothes
      </h2>
      <br/>
    </div>

    <div class="container">
      <div id="allClothes-list-wrapper">
        <ul>
          <li v-for="cloth in clothes">
            <router-link :to="`/closet/clothes/detail/${cloth.id}`" class="is-active">
              <img class="pic" v-bind:src="cloth.image" width='300'>
            </router-link>
            <br/><br/>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('ALLCLOTHES_LOAD')
  },
  computed: {
    clothes () {
      return this.$store.getters.clothes
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
