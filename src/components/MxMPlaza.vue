<template>
  <div class="container">
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        MxM Plaza
      </h1>
      <h2 class="subtitle">
        Look Around Other People's MxMs
      </h2>
      <br/>
    </div>
    <button style="width:250px" v-on:click="filterAll" :class="{ active: filter == 'all' }"> all</button>
    <button style="width:250px" v-on:click="filterRecom" :class="{ active: filter == 'recommendation' }"> recommendation</button>
    <button style="width:250px"  v-on:click="filterEval" :class="{ active: filter == 'evaluation' }"> evaluation</button>
    <div class="container">
      <div id="mxm-plaza-wrapper">
        <ul>
          <li v-for="mxm in filteredMxMs">
            {{mxm.id}}<br/>
            <router-link :to="`/plaza/detail/${mxm.id}`" class="is-active">
            <div class="row">
              <span v-for="cloth in mxm.clothes">
                <img class="pic" v-bind:src="cloth.image" width='200'>
              </span>
            </div>
             </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('MXMPLAZA_LOAD')
  },
  data () {
    return {
      filter: 'all'
    }
  },
  computed: {
    filteredMxMs () {
      return this[this.filter]
    },
    all () {
      return this.$store.getters.mxmsInPlaza
    },
    recommendation () {
      return this.all.filter((mxm) => mxm.is_on_recommendation)
    },
    evaluation () {
      return this.all.filter((mxm) => mxm.is_on_evaluation)
    }
  },
  methods: {
    filterAll () {
      this.filter = 'all'
    },
    filterRecom () {
      this.filter = 'recommendation'
    },
    filterEval () {
      this.filter = 'evaluation'
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
