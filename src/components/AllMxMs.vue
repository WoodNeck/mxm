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

    <section>
      <div id="allMxMs-buttons-wrapper">
        <br/>
        <a class="button is-large" v-on:click="setRecommend(checkedMxMs)">RECOMMENDATION</a>
        <a class="button is-large" v-on:click="setEval(checkedMxMs)">EVALUATION</a>
        <br/><br/>
    </section>

    <section>
      <!-- <b-loading :is-full-page="true" :active.sync="isLoading" /> -->
      <!-- {{ total }} -->
      <br/>
      <div v-for="(mxm, mxmIndex) in mxms" :key="mxmIndex">
        <div class="card" :id="mxmIndex">
          <header class="card-header">
            <input type="checkbox" :id="mxm.id" :value="mxm.id" v-model="checkedMxMs">
            <label :for="mxm.id">
              <p class="title">
                MxM #{{ mxm.id }}
              </p>
            </label>
          </header>

          <router-link :to="`/closet/mxm/detail/${mxm.id}`" class="is-active">
            <div class="card-content">
              <template v-for="cloth in mxm.clothes">
                <img class="pic" v-bind:src="getClothById(cloth).image">
              </template><br/>
            </div>

            <div class="card-content">
              <div class="field is-grouped is-grouped-multiline">
                <div class="recomm">
                  <div class="tags has-addons">
                    <span class="tag is-primary is-large">For Recommendation?</span>
                    <span class="tag is-large">
                      <template v-if="mxm.is_on_recommendation">
                        Yes
                      </template>
                      <template v-else>
                        No
                      </template>
                    </span>
                  </div>
                </div>

                <div class="eval">
                  <div class="tags has-addons">
                    <span class="tag is-primary is-large">For Evaluation?</span>
                    <span class="tag is-large">
                      <template v-if="mxm.is_on_evaluation">
                        Yes
                      </template>
                      <template v-else>
                        No
                      </template>
                    </span>
                  </div>
                </div>

            </div>

          </div>
        </router-link>
      </div>
      <br/><br/>
      </div>
    </section>

    <b-pagination
      :total="total"
      :current.sync="page"
      :rounded="false"
      :per-page="5"
      @change="pageChange">
    </b-pagination>

  </section>
</template>

<script>
import { ALLMXMS_LOAD } from '@/store/types'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      checkedMxMs: []
    }
  },
  created () {
    this.$store.dispatch(ALLMXMS_LOAD, {
      page: this.page
    })
  },
  computed: {
    ...mapGetters({
      mxms: 'allMxM_mxms',
      clothes: 'allMxM_clothes',
      page: 'allMxM_page',
      total: 'allMxM_total',
      isLoading: 'allMxM_isLoading'
    })
  },
  methods: {
    getClothById: function (id) {
      return this.clothes.find(cloth => cloth.id === parseInt(id))
    },
    setRecommend: function () {
      this.$store.dispatch('ALLMXMS_SET_RECOMMEND', this.checkedMxMs)
      alert('Set for Recommendation')
    },
    setEval: function () {
      this.$store.dispatch('ALLMXMS_SET_EVAL', this.checkedMxMs)
      alert('Set for Evaluation')
    },
    pageChange (page) {
      this.$store.dispatch(ALLMXMS_LOAD, {
        page: page
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
.pic {
  object-fit: cover;
  position: relative;
  height: 200px;
  width: 150px;
}
.title {
  color: #42b983;
  margin-top:18px;
}
.card-content {
  align-items: center;
}
input[type='checkbox'] {
    -webkit-appearance:none;
    width:30px;
    height:30px;
    background:white;
    border-radius:5px;
    border:2px solid #555;
    margin-left:25px;
    margin-right:20px;
    margin-top:20px;
    margin-bottom:20px;
}
input[type='checkbox']:checked {
    background: #42b983;
}
#header {
  margin-bottom: 48px;
}
#header-text {
  font-family: 'Rubik Mono One', sans-serif;
}
</style>
