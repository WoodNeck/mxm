<template>
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        MxM Plaza
      </h1>
      <h2 class="subtitle">
        Look Around Other People's MxMs
      </h2>
      <br/>
    </div>

    <div class="container">
      <div id="mxm-plaza-wrapper">
        <ul>
          <li v-for="mxm in mxms">
            {{mxm.id}}<br/>
            <ul>
              <li v-for="cloth in mxm.clothes">
                <img class="pic" v-bind:src="cloth.image" width='300'>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('MXMPLAZA_LOAD')
  },
  computed: {
    mxms () {
      return this.$store.getters.mxms
    }
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
