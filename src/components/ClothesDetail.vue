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
      <div class="card-content">
        <p class="title is-3">
          <center>MY CLOTHES #{{ cloth.id }}<center> <br/>
            {{cloth.tag}}
        </p>
        <center>
        <div v-for="tag in cloth.tag">
          {{tag}}<br/>
          <!-- <div v-if="cloth.tag.includes(tag)"> -->
            <!-- <span class="tag is-large" is-primary>{{ getTagById(tag).type }}</span>
            <span class="tag is-large">{{ getTagById(tag).contents }}</span>
          </div> -->
        </div> </center>
        <!-- <div class="field is-grouped is-grouped-multiline">
          <template v-for="(tag, index) in tags">
            <div v-if="cloth.tag.includes(index+1)">
              <span class=
              {{ tag.type}}: {{ tag.content }}
            </div>
          </template>
        <br/> -->
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
  },
  method: {
    getTagById: function (id) {
      console.log(id)
      console.log(this.tags)
      return this.tags.find(tag => tag.id === parseInt(id))
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
</style>
