<template>
  <div class="container">
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        MxM #{{mxm.id}}
      </h1>
    </div>
    <div id="mxm-detail-wrapper">
      <br/>
      MxM
      <br/>
      <transition-group>  
        <img v-for="(cloth, index) in clothesInMxM" v-on:click="removeFromMxM(index)" class="pic" v-bind:src="cloth.image" width='200' :key="cloth.id">
      </transition-group>
      <br/>
      <br/>
      <br/>
      allClothes
      <br/>
      <transition-group>
        <img v-for="(cloth, index) in clothesNotInMxM" v-on:click="addToMxM(index)" class="pic" v-bind:src="cloth.image" width='200' :key="cloth.id" >
      </transition-group>
      <br/>
      <br/>
      Description
      <br/>
      <textarea v-model="mxm.description" rows='6' cols='80'  placeholder="add your own description about mxm"></textarea>
      <br/>
      <button v-on:click="save">save</button>
      <br/>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    axios.get('/api/mxms/' + this.$route.params.id)
    .then(res => res.data)
    .then(mxm => {
      this.mxm = mxm
      this.clothesInMxM = mxm.clothes
    })
    axios.get('/api/clothes/')
    .then(res => res.data)
    .then(clothes => {
      this.allClothes = clothes
    })
  },
  data: function () {
    return {
      mxm: null,
      allClothes: [],
      clothesInMxM: []
    }
  },
  computed: {
    clothesNotInMxM () {
      return this.allClothes.filter(cloth =>
        !this.clothesInMxM.some(cloth2 => (cloth.id === cloth2.id))
      )
    }
  },
  methods: {
    removeFromMxM: function (index) {
      this.mxm.clothes.splice(index, 1)
    },
    addToMxM: function (index) {
      this.mxm.clothes.splice(this.mxm.clothes.length, 0, this.clothesNotInMxM[index])
    },
    save: function () {
      axios.patch('/api/mxms/' + this.$route.params.id + '/', {
        clothes: this.mxm.clothes.map(cloth => cloth.id),
        description: this.mxm.description
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
