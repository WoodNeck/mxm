<template>
  <section>
  <div class="level">
    <div class="level-left">
      <a @click="$router.go(-1)" class="button is-primary level-item">
        <b-icon pack="fas" icon="arrow-circle-left"></b-icon>
        <span>Back To List</span>
      </a>
    </div>
    <div class="level-right">
      <div class="level-item" />
    </div>
  </div>
  <section class="hero is-primary" id="header">
    <div class="hero-body">
      <h1 class="title is-1" id="header-text">Clothes Detail</h1>
    </div>
  </section>

    <div class="card">
      <div class="card-image">
        <center><img class="pic" v-bind:src="cloth.image" width='600'><br/><br/></center>
      </div>
      <div class="card-contentv">
        <p class="title is-3">
          <center>MY CLOTHES #{{ cloth.id }}</center> <br/>
        </p>
        <div class="field is-grouped is-grouped-multiline">
          <div v-for="tag in tags">
            <div v-if="cloth.tag.includes(tag.id)">
              <div class="tags has-addons" id="tags">
                <span class="tag is-large is-primary">{{ tag.type }}</span>
                <span class="tag is-large">{{ tag.content }}</span>
              </div>
            </div>
          </div> <br/>
        </div>
      </div>
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
#header {
  margin-bottom: 48px;
}
#header-text {
  font-family: 'Rubik Mono One', sans-serif;
}
#tags {
  align-content: center;
}
</style>

