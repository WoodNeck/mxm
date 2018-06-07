<template>
  <div class="card" v-if="clothes.id >= 0">
    <div class="card-image">
      <figure class="image is-square">
        <img :src="clothes.image">
      </figure>
    </div>
    <div class="card-content">
      <div class="tags">
        <span class="tag is-rounded" v-for="tag in clothes.tag" :key="tag">
          {{tag}}
        </span>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
