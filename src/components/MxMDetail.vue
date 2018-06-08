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
      <grid-layout class="MxMArea" :layout="clothesLayout" ref=gridLayout
        :col-num=col_num :row-height=row_height :max-rows=max_rows
        :verticalCompact="false" :autoSize="false"
        :is-draggable="true" :is-resizable="true" :is-mirrored="false"
        :use-css-transforms="true">
        <grid-item v-for="(item, key) in clothesLayout" ref=grid
          :x="item.x" :y="item.y" :w="item.w" :h="item.h" :maxH="20" :i="item.i"
          @resized="resizedEvent">
          <img class="pic" ref=image v-bind:src="getClothById(item.i).image" 
            v-on:dblclick="removeFromMxM(key)">
        </grid-item>
      </grid-layout>
      <br/>
      <br/>
      allClothes
      <br/>
      <button v-on:click="allClothesType='normal'">normal</button>
      <button v-on:click="allClothesType='wildcard'">wildcard</button>
      <br/>
      <div>
        <img v-for="(cloth, key) in clothesNotInMxM" class="pic" ref=notMxMImg
          v-bind:src="cloth.image" v-on:click="addToMxM(key)" width="200">
      </div>
      <br/>
      <br/>
      Description
      <br/>
      <textarea v-model="mxm.description" rows='6' cols='80'  placeholder="add your own description about mxm"></textarea>
      <br/>
      <router-link :to="`/closet/mxm/all/`" class="is-active">
        <button v-on:click="save">Save</button>
        <button>Back</button>
      </router-link>
      <br/>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout,
    GridItem
  },
  created () {
    axios.get('/api/mxms/' + this.$route.params.id)
    .then(res => res.data)
    .then(mxm => {
      this.mxm = mxm
      this.parseAndCheckClothesLayout(mxm)
    })
    axios.get('/api/clothes/')
    .then(res => res.data)
    .then(clothes => {
      this.allClothes = clothes
    })
  },
  computed: {
    clothesNotInMxM: {
      get () {
        var clothes
        if (this.allClothesType === 'normal') {
          clothes = this.allClothes.filter(cloth => !cloth.is_wildcard)
        } else if (this.allClothesType === 'wildcard') {
          clothes = this.allClothes.filter(cloth => cloth.is_wildcard)
        }
        return clothes.filter(cloth =>
          !this.clothesLayout.some(cloth2 => (cloth.id === parseInt(cloth2['i'])))
        )
      }
    }
  },
  data: function () {
    return {
      mxm: null,
      allClothes: [],
      clothesLayout: [],
      allClothesType: 'normal',

      // constants for GridLayout
      col_num: 300,
      row_height: 10,
      max_rows: 30
    }
  },
  methods: {
    parseAndCheckClothesLayout: function (mxm) {
      var clothesLayout = mxm.clothes_layout
      var clothes = mxm.clothes
      if (clothesLayout === '' || clothesLayout === '[]') {
        this.clothesLayout = []
      } else this.clothesLayout = JSON.parse(clothesLayout)

      var x = 0
      for (var i = 0; i < clothes.length; i++) {
        var cloth = clothes[i]
        if (this.clothesLayout.every(item => item['i'] !== String(cloth.id))) {
          var item = {'x': x, 'y': 0, 'w': 50, 'h': 6, 'i': String(cloth.id)}
          x += 60
          this.clothesLayout.push(item)
        }
      }
    },
    resizedEvent: function (i, H, W, HPx, WPx) {
      var index = this.clothesLayout.findIndex(item => item['i'] === i)
      var image = this.$refs.image[index]
      if (H > this.imageSizeToH(image.clientHeight)) {
        this.$nextTick(function () {
          this.clothesLayout[index].h = this.imageSizeToH(image.clientHeight)
        })
      }
      if (W > this.imageSizeToW(image.clientWidth)) {
        this.$nextTick(function () {
          this.clothesLayout[index].w = this.imageSizeToW(image.clientWidth)
        })
      }
    },
    getClothById: function (id) {
      return this.allClothes.find(cloth => cloth.id === parseInt(id))
    },
    imageSizeToH: function (imageHeight) {
      return Math.round(imageHeight / (this.row_height * 2))
    },
    imageSizeToW: function (imageWidth) {
      return Math.round((imageWidth * this.col_num) / 800)
    },
    addToMxM: function (index) {
      var image = this.$refs.notMxMImg[index]
      var w = this.imageSizeToW(image.clientWidth)
      var h = this.imageSizeToH(image.clientHeight)
      var item = {'x': 0, 'y': 0, 'w': w, 'h': h, 'i': String(this.clothesNotInMxM[index].id)}
      this.clothesLayout.splice(0, 0, item)
    },
    removeFromMxM: function (index) {
      this.clothesLayout.splice(index, 1)
    },
    save: function () {
      axios.patch('/api/mxms/' + this.$route.params.id + '/', {
        clothes: this.clothesLayout.map(cloth => parseInt(cloth.i)),
        clothes_layout: JSON.stringify(this.clothesLayout),
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
.pic {
  max-width: 100%;
  max-height: 100%;
}
.MxMArea {
  height: 600px;
  width: 800px;
  background-color: #fceeb4;
}
</style>
