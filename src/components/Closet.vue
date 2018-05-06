<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <ul class="menu-list">
            <li><router-link to="/closet/all" class="is-active">All Clothes</router-link></li>
            <li><router-link to="/closet/mxm">All MxMs</router-link></li>
          </ul>
        </aside>
      </div>
      <div class="column is-9">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
