<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <ul class="menu-list">
            <li><router-link to="/closet/clothes/all" class="is-active">All Clothes</router-link></li>
            <li><router-link to="/closet/mxm/all">All MxMs</router-link></li>
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

}
</script>

<style scoped>

</style>
