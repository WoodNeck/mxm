<template>
  <section>
    <div class="level">
      <div class="level-left">
        <h1 class="title level-item">
          All Clothes
        </h1>
      </div>
      <div class="level-right">
        <router-link to="/closet/clothes/new" class="button is-primary level-item">New</router-link>
      </div>
    </div>

    <div class="section">
      <div id='allCothes-filter-wrapper'>
       <a class="button" @click="showAll()">ALL</a>
       <a class="button" v-for="(tag, index) in tags" :vale="index" @click="filterTag(index+1)">
         {{ tag.content }}
       </a>
      </div>
    </div>

    <div class="section">
      <b-loading :is-full-page="false" :active.sync="isLoading" />
      <div v-for="(clothes, arrayIndex) in clothes_row" v-bind:key="arrayIndex" class="columns is-3">
        <div v-for="cloth in clothes" :key="cloth.id" class="column">
          <router-link :to="`/closet/clothes/detail/${cloth.id}`" class="is-active">
            <clothes :cloth="cloth" />
          </router-link>
        </div>
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
import Clothes from '@/components/Clothes.vue'
import { mapGetters } from 'vuex'
import { ALLCLOTHES_LOAD } from '@/store/types'
export default {
  data () {
    return {
      filter: 0
    }
  },
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
      let clothes = this.clothes()
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
    },
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

</style>
