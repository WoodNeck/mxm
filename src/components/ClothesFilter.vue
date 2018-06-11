<template>
  <div id='clothes-filter-wrapper'>
  <div class='dropdown' v-for="(tagsOfType, type) in tagsDict">
    <button class="dropdown-filter">
      {{ type }}: {{ filters[type] === null ? 'all' : filters[type].content }}
    </button>
    <div class="filter-content">
      <button v-on:click="changeFilter(type, null)"> all </button>
      <button v-for="tag in tagsOfType" 
        v-on:click="changeFilter(type, tag)">
        {{ tag.content }}
      </button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'clothesFilter',
  data () {
    return {
      filters: {'Color': null, 'Season': null, 'Texture': null, 'Category': null}
    }
  },
  created () {
    this.$store.dispatch('TAGS_LOAD')
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    tagsDict () {
      var result = {}
      for (var i = 0; i < this.tags.length; i++) {
        var tag = this.tags[i]
        var type = tag.type
        if (type in result) {
          result[type].push(tag)
        } else {
          result[type] = [tag]
        }
      }
      return result
    }
  },
  methods: {
    changeFilter (type, content) {
      this.filters[type] = content
      this.$emit('applyFilter', this.filters)
    }
  }
}
</script>

<style>
.dropdown-filter {
  position: relative;
  background-color: #a0c0ee;
  border: none;
  height: 25px;
  width: 200px;
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown:hover .filter-content {
  display: block;
}
.dropdown:hover .dropdown-filter {
  background-color: #b0d0ff;
}
.filter-content {
  display: none;
  position: absolute;
  background-color: grey;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
  z-index: 1;
}
.filter-content button {
  width: 200px;
  height: 25px;
  display: block;
}
.filter-content button:hover {
  background-color: #ccc;
}
</style>
