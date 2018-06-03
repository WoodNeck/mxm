<template>
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        All MxMs
      </h1>
      <h2 class="subtitle">
        Check your MxMs
      </h2>
      <br/>
    </div>

    <div class="container">
      <div id="allMxMs-buttons-wrapper">
        <a class="button" v-on:click="setRecommend(checkedMxMs)">RECOMMENDATION</a>
        <a class="button" v-on:click="setEval(checkedMxMs)">EVALUATION</a>
        <br/><br/>
      </div>
      <div id="allMxMs-list-wrapper">
        <ul>
          <li v-for="mxm in mxms">
            <input type="checkbox" :id="mxm.id" :value="mxm.id" v-model="checkedMxMs">
              <label :for="mxm.id">
              MxM #{{ mxm.id }}<br/>
              <span v-for="cloth in mxm.clothes">
                <img class="pic" v-bind:src="cloth.image" width='200'>
              </span><br/>
              when created? {{ mxm.created_time }}<br/>
              for recommendation? {{ mxm.is_on_recommendation }}<br/>
              for evaluation? {{ mxm.is_on_evaluation }}
              <br/><br/>
              </label>
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
      checkedMxMs: []
    }
  },
  created () {
    this.$store.dispatch('ALLMXMS_LOAD')
  },
  computed: {
    mxms () {
      return this.$store.getters.mxms
    }
  },
  methods: {
    setRecommend: function () {
      this.$store.dispatch('ALLMXMS_SET_RECOMMEND', this.checkedMxMs)
      alert('Set for Recommendation')
    },
    setEval: function () {
      this.$store.dispatch('ALLMXMS_SET_EVAL', this.checkedMxMs)
      alert('Set for Evaluation')
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
