<template>
  <div v-if="clothes.id >= 0">
    <img class="hanger" :src="require('@/assets/images/hanger.png')" />
    <div class="card">
      <div class="card-image">
        <figure class="image is-square">
          <img :src="clothes.image" class="clothes-image">
        </figure>
      </div>
      <div class="card-content">
        <div class="tags">
          <span class="tag is-rounded" v-for="tag in tags" :key="tag.index" :style="{'background-color': tag.bgColor, 'color': tag.textColor}">
            {{tag.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cloth'],
  data () {
    return {
      clothes: this.cloth
    }
  },
  computed: {
    tags () {
      return this.clothes.tag.map(index => {
        let tag = this.$store.getters.tags[index]
        let name = tag.type === 'Color'
          ? tag.content.slice(0, tag.content.indexOf('(')) : tag.content
        let color = tag.type === 'Color'
          ? tag.content.slice(tag.content.indexOf('(') + 1, tag.content.indexOf(')')) : '#f5f5f5'
        let r = parseInt(color.substring(1, 3), 16)
        let g = parseInt(color.substring(3, 5), 16)
        let b = parseInt(color.substring(5, 7), 16)
        let nThreshold = 105
        let bgDelta = (r * 0.299) + (g * 0.587) + (b * 0.114)
        let textColor = ((255 - bgDelta) < nThreshold) ? '#000000' : '#ffffff'

        return {
          index: tag.index,
          name: name,
          bgColor: color,
          textColor: textColor
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clothes-image {
    object-fit: cover;
    display: block;
    position: relative;
  }
  .hanger {
    display: block;
    margin: auto;
    max-width: 100%;
    height: 76px;
  }
</style>
