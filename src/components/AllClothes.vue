<template>
  <section>
    <div class="level">
      <div class="level-left">
        <div class="level-item" />
      </div>
      <div class="level-right">
        <router-link to="/closet/clothes/new" class="button is-primary level-item">
          <b-icon pack="fas" icon="plus-circle" />
          <span>New</span>
        </router-link>
      </div>
    </div>

    <section class="hero is-primary" id="header">
      <div class="hero-body">
        <h1 class="title is-1" id="header-text">All Clothes</h1>
      </div>
    </section>

    <section>
      <b-loading :is-full-page="false" :active.sync="isLoading" />
      <div v-for="(clothes, arrayIndex) in clothes_row" v-bind:key="arrayIndex" class="columns is-3">
        <div v-for="cloth in clothes" :key="cloth.id" class="column">
          <router-link :to="`/closet/clothes/detail/${cloth.id}`" class="is-active">
            <clothes :cloth="cloth" />
          </router-link>
        </div>
      </div>
    </section>

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
import Clothes from '@/components/Clothes.vue'
import { mapGetters } from 'vuex'
import { ALLCLOTHES_LOAD,
         ALLCLOTHES_SET_TAG } from '@/store/types'
export default {
  created () {
    this.$store.dispatch(ALLCLOTHES_LOAD, {
      page: this.page,
      toast: this.$toast
    })
  },
  computed: {
    ...mapGetters({
      clothes: 'clothes',
      tags: 'tags',
      total: 'total',
      page: 'page',
      isLoading: 'isLoading'
    }),
    clothes_row () {
      let clothes = this.$store.getters.clothes
      let size = Math.ceil(clothes.length / 4.0)
      let packedClothes = []
      for (let i = 0; i < size; i += 1) {
        packedClothes.push(clothes.slice(4 * i, (4 * i + 4) < clothes.length ? 4 * i + 4 : clothes.length))
      }
      if (clothes.length % 4 !== 0) {
        for (let i = 0; i < 4 - (clothes.length % 4); i += 1) {
          packedClothes[packedClothes.length - 1].push({
            id: -1
          })
        }
      }
      return packedClothes
    }
  },
  methods: {
    pageChange (page) {
      this.$store.dispatch(ALLCLOTHES_LOAD, {
        page: page,
        toast: this.$toast
      })
    }
  },
  components: {
    'Clothes': Clothes
  }
}
</script>


<style scoped>
  #header {
    margin-bottom: 48px;
  }
  #header-text {
    font-family: 'Rubik Mono One', sans-serif;
  }
</style>
