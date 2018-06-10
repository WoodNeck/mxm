<template>
  <section class="hero">
    <div class="level">
      <div class="level-left">
        <div class="level-item" />
      </div>
      <div class="level-right">
        <router-link to="/closet/clothes/new" class="button is-primary level-item">New</router-link>
      </div>
    </div>

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
      <clothesFilter :clothes="clothes"
        @applyFilter="applyFilter"/>
      <br/><br/>
      <div id="allClothes-list-wrapper">
        <ul>
          <li v-for="cloth in filteredClothes">
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
import clothesFilter from './ClothesFilter.vue'
export default {
  components: {
    clothesFilter
  },
  data () {
    return {
      filteredClothes: []
    }
  },
  created () {
    this.$store.dispatch('ALLCLOTHES_LOAD')
    this.$store.dispatch('TAGS_LOAD')
  },
  computed: {
    clothes () {
      return this.$store.getters.clothes
    },
    tags () {
      return this.$store.getters.tags
    }
  },
  methods: {
    applyFilter: function (value) {
      this.filteredClothes = value
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
