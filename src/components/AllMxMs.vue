<template>
  <section class="hero">
    <div class="level">
      <div class="level-left">
        <div class="level-item" />
      </div>
      <div class="level-right">
        <router-link to="/closet/mxm/new" class="button is-primary level-item">
          <b-icon pack="fas" icon="plus-circle" />
          <span>New</span>
        </router-link>
      </div>
    </div>

    <section class="hero is-primary" id="header">
      <div class="hero-body">
        <h1 class="title is-1" id="header-text">All MxMs</h1>
      </div>
    </section>

    <!-- <section>
      <b-loading :is-full-page="false" :active.sync="isLoading" />
      <div v-for="(clothes, arrayIndex) in clothes_row" v-bind:key="arrayIndex" class="columns is-3">
        <div v-for="cloth in clothes" :key="cloth.id" class="column">
          <router-link :to="`/closet/clothes/detail/${cloth.id}`" class="is-active">
            <clothes :cloth="cloth" />
          </router-link>
        </div>
      </div>
    </section> -->


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
              <router-link :to="`/closet/mxm/detail/${mxm.id}`" class="is-active">
                MxM #{{ mxm.id }}
              <br/>
              <span v-for="cloth in mxm.clothes">
                <img class="pic" v-bind:src="cloth.image" width='200'>
              </span><br/>
              when created? {{ mxm.created_time }}<br/>
              for recommendation? {{ mxm.is_on_recommendation }}<br/>
              for evaluation? {{ mxm.is_on_evaluation }}
              </router-link>
              <br/><br/>
              </label>
          </li>
        </ul>
      </div>
    </div>

    <b-pagination
    :total="total"
    :current.sync="page"
    :rounded="false"
    :per-page="10"
    @change="pageChange">
    </b-pagination>

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
