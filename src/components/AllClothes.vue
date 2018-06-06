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
      <div id='allCothes-filter-wrapper'>
       <a class="button" @click="showAll()">ALL</a>
       <a class="button" v-for="(tag, index) in tags" :vale="index" @click="filterTag(index+1)">
         {{ tag.content }}
       </button>
      </div>
      <br/><br/>

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
  data () {
    return {
      filter: 0
    }
  },
  created () {
    this.$store.dispatch('ALLCLOTHES_LOAD')
    this.$store.dispatch('TAGS_LOAD')
  },
  computed: {
    clothes () {
      if (this.filter === 0) {
        return this.all
      }
      return this.filtered
    },
    all () {
      return this.$store.getters.clothes
    },
    filtered () {
      if (this.filter !== 0) {
        var filterIndex = this.filter
        return this.all.filter(function (cloth) {
          return (cloth.tag.includes(filterIndex))
        })
      }
    },
    tags () {
      return this.$store.getters.tags
    }
  },
  methods: {
    showAll: function () {
      this.filter = 0
    },
    filterTag: function (tagIndex) {
      this.filter = tagIndex
      console.log('this filter: ' + this.filter)
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>

