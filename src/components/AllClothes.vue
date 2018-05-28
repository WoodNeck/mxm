<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item" />
      </div>
      <div class="level-right">
        <router-link to="/closet/clothes/new" class="button is-primary level-item">New</router-link>
      </div>
    </div>
    <div id="allClothes-list-wrapper">
      <ul>
        <li v-for="cloth in clothes">
          <router-link to="/closet/clothes/detail" class="is-active">
            <img class="pic" v-bind:src="cloth.image" width='300'>
          </router-link>
          <br/><br/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      clothes: []
    }
  },
  created () {
    axios.get('http://localhost:8000/api/clothes/')
    .then(res => {
      this.clothes = res.data
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
