<template>
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        All MxMs
      </h1>
      <h2 class="subtitle">
        Check your MxMs
      </h2>
      <br/>
    </div>

    <div class="container">
      <div id="allMxMs-list-wrapper">
        <ul>
          <li v-for="mxm in mxms">
            MxM #{{ mxm.id }}<br/>
            clothes id: {{ mxm.clothes }}<br/>
            when created? {{ mxm.created_time }}
            <br/><br/>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      mxms: []
    }
  },
  created () {
    axios.get('http://localhost:8000/api/mxms/')
    .then(res => {
      this.mxms = res.data
    })
    .catch(error => console.log(error))
  }
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
