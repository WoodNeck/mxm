<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          All Clothes
        </h1>
        <h2 class="subtitle">
          Check your clothes
        </h2>
      </div>

      <div id="AllClothesclasses">
        <ul>
          <li v-for="cloth in clothes">
            <Cloth v-bind:cloth="cloth" v-bind:id="cloth.id"> </Cloth>
            {{cloth.id}} <br />
            <img class="pic" v-bind:src="cloth.image" width='150'>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      clothes: [
        { id: '1',
          image: require('@/assets/jacket.png')
        },
        { id: '2',
          image: require('@/assets/top.jpg')
        }
      ]
    }
  }
}
</script>


<style scoped>

</style>
