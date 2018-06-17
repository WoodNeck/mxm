<template>
  <div class="container">
  <section class="hero">
    <section class="hero is-primary" id="header">
      <div class="hero-body">
        <h1 class="title is-1" id="header-text">MxM Plaza</h1>
        <h2 class="title is-4">
          Look Around Other People's MxMs
        </h2>
      </div>
    </section>

    <div class="field is-grouped">
      <p class="control">
        <a class="button is-large is-primary" v-on:click="filterAll" :class="{ active: filter == 'all' }"> ALL</a>
      </p>
      <p class="control">
        <a class="button is-large" v-on:click="filterRecom" :class="{ active: filter == 'recommendation' }"> Recommendation</a>
      </p>
      <p class="control">
        <a class="button is-large"  v-on:click="filterEval" :class="{ active: filter == 'evaluation' }"> Evaluation</a>
      </p>
    </div> <br/><br/>

    <div class="container">
      <div id="mxm-plaza-wrapper">
        <div v-for="mxm in filteredMxMs">
          <router-link :to="`/plaza/detail/${mxm.id}`" class="is-active">
            <div class="card" :id="mxm.id">
              <header class="card-header">
                <div class="title">
                  MxM #{{ mxm.id }}
                </div>
                <div class="owner">
                  by {{ users.find(user => user.id === mxm.owner).username }}
                </div>
              </header>

            <div class="card-content">
              <span v-for="cloth in mxm.clothes">
                <img class="pic" v-bind:src="cloth.image">
              </span>
            </div>
           </div>
         </router-link><br/><br/>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('MXMPLAZA_LOAD')
    this.$store.dispatch('MXMPLAZA_USER_LOAD')
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
    },
    users () {
      return this.$store.getters.users
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
#header {
  margin-bottom: 48px;
}
#header-text {
  font-family: 'Rubik Mono One', sans-serif;
}
.title {
  color: #42b983;
  margin-top:15px;
  margin-left:15px;
  margin-bottom:15px;
}
.pic {
  object-fit: cover;
  position: relative;
  height: 200px;
  width: 150px;
}
.owner {
  font-size: 1.3em;
  margin-left: 30px;
  margin-top: 20px;
}
</style>
