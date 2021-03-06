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
        <grid-item v-for="(item, key) in clothesLayout" ref=grid :key=key
          :x="item.x" :y="item.y" :w="item.w" :h="item.h" :maxH="20" :i="item.i"
          @resized="resizedEvent">
          <figure class="tint" v-on:dblclick="removeFromMxM(key)">
            <img class="pic"
              ref=image v-bind:src="getClothById(item.i).image">
          </figure>
        </grid-item>
      </grid-layout>
      <br/>
      allClothes
      <br/>
      <div class="tabFilterType">
        <button v-on:click="toggleFilterType($event,'normal')"
          :class="[filterType==='normal' ? 'buttonFilterTypeActive' : 'buttonFilterType']">
           normal</button>
        <button v-on:click="toggleFilterType($event,'wildcard')"
          :class="[filterType==='wildcard' ? 'buttonFilterTypeActive' : 'buttonFilterType']">
           wildcard</button>
      </div>
      <div class="clothesNotInMxM">
        <clothesFilter :filters="filters" @applyFilter="applyFilter"/>
        <img v-for="(cloth, key) in filteredClothes" ref=notMxMImg
          v-bind:src="cloth.image" v-on:click="addToMxM(key)" width="200">
      </div>
      <br/>
      <br/>
      Description
      <br/>
      <textarea v-model="mxm.description" rows='6' cols='80'  placeholder="add your own description about mxm"></textarea>
      <br/>
      <router-link :to="`/closet/mxm/all/`">
        <button v-on:click="save" class="buttonBottom">Save</button>
        <button class="buttonBottom">Back</button>
      </router-link>
      <br/>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
import { GridLayout, GridItem } from 'vue-grid-layout'
import clothesFilter from './ClothesFilter.vue'
import { ALLMXMS_MXMS_ADD } from '@/store/types'

export default {
  components: {
    GridLayout,
    GridItem,
    clothesFilter
  },
  created () {
    if (this.$route.path !== '/closet/mxm/new') {
      axios.get('/api/mxms/' + this.$route.params.id)
      .then(res => res.data)
      .then(mxm => {
        this.mxm = mxm
        this.parseAndCheckClothesLayout(mxm)
      })
    } else {
      this.mxm = {}
    }
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
        if (this.filterType === 'normal') {
          clothes = this.allClothes.filter(cloth => !cloth.is_wildcard)
        } else if (this.filterType === 'wildcard') {
          clothes = this.allClothes.filter(cloth => cloth.is_wildcard)
        }
        return clothes.filter(cloth =>
          !this.clothesLayout.some(cloth2 => (cloth.id === parseInt(cloth2['i'])))
        )
      }
    },
    filteredClothes: {
      get () {
        var result = this.clothesNotInMxM
        for (var type in this.filters) {
          var tag = this.filters[type]
          if (tag === null) {
            continue
          }
          result = result.filter(cloth => (cloth.tag.includes(tag.id)))
        }
        return result
      }
    }
  },
  data: function () {
    return {
      mxm: null,
      allClothes: [],
      clothesLayout: [],
      filterType: 'normal',
      filters: {'Color': null, 'Season': null, 'Texture': null, 'Category': null},

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
      if (HPx > WPx * image.naturalHeight / image.naturalWidth) {
        this.$nextTick(function () {
          var newHPx = WPx * image.naturalHeight / image.naturalWidth
          this.clothesLayout[index].h = this.imageSizeToH(newHPx)
        })
      } else {
        this.$nextTick(function () {
          var newWPx = HPx * image.naturalWidth / image.naturalHeight
          this.clothesLayout[index].w = this.imageSizeToW(newWPx)
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
    toggleFilterType: function (event, filter) {
      this.filterType = filter
    },
    applyFilter: function (value) {
      this.filters = value
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
      var ownerId = this.$store.getters.user.id
      var content = {
        owner: ownerId,
        clothes: this.clothesLayout.map(cloth => parseInt(cloth.i)),
        clothes_layout: JSON.stringify(this.clothesLayout),
        description: this.mxm.description
      }
      if (this.$route.path !== '/closet/mxm/new') {
        axios.patch('/api/mxms/' + this.$route.params.id + '/',
          content)
      } else {
        axios.post('/api/mxms/', content)
        .then(res => {
          let newMxM = res.data
          this.$store.commit(ALLMXMS_MXMS_ADD, newMxM)
        })
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
.tint {
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.3) 4px 6px 6px;
}
.tint:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: none;
  transition: all .3s linear;
}
.tint:hover:before { background: rgba(255, 192, 192, 0.5); }
.tint .pic {
  height: 100%;
  width: 100%;
}
.MxMArea {
  border: 2px solid #aaa;
  height: 600px;
  width: 800px;
  background-color: #fceeb4;
}
.clothesNotInMxM {
  background-color: #a0c0ee;
  width: 800px;
  min-height: 200px;
  overflow: auto;
  white-space: nowrap;
}
.clothesNotInMxM img {
  display: inline-block;
  padding: 14px;
  transition: all .3s linear;
}
.clothesNotInMxM img:hover {
  background-color: #eed0d0;
}
.tabFilterType {
  overflow: hidden;
  background-color: #ffffff;
}
.buttonFilterType {
  border-bottom: 25px solid #c0e0ff;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  height: 0;
  width: 100px;
  height: 0;
  width: 100px;
}
.buttonFilterType:hover {
  border-bottom: 25px solid #b0d0ff;
}
.buttonFilterTypeActive {
  border-bottom: 25px solid #a0c0ee;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  height: 0;
  width: 100px;
}
.buttonBottom {
  height: 30px;
  width: 60px;
  background-color: #ddd;
}
</style>
