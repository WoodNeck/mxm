<template>
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        Clothes Detail
      </h1>
      <h2 class="subtitle">
        Check your clothes detail
      </h2>
      <br/>
    </div>

    <div class="container">
      <div id="clothes-detail-wrapper">
        <img class="pic" v-bind:src="cloth.image" width='300'><br/><br/>
        CLOTHES #{{ cloth.id }} <br/>
        Added at {{ cloth.created_time }} <br/>
        <ul v-for="(tag, index) in tags">
          <div v-if="cloth.tag.includes(index+1)">
            {{ tag.type}}: {{ tag.content }}
          </div>
        </ul>
        <br/>
      </div>
      <router-link :to="`/closet/clothes/all/`" class="is-active">
        <a class="button">Back to List</a>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('CLOTHES_LOAD', this.$route.params.id)
    this.$store.dispatch('TAGS_LOAD')
  },
  computed: {
    cloth () {
      return this.$store.getters.cloth
    },
    tags () {
      return this.$store.getters.tags
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
