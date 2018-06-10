<template>
  <div class="container">
    <div class="columns">
      <div id="closet-menu-wrapper" class="column is-2">
        <aside class="menu">
          <ul class="menu-list">
            <li><router-link to="/closet/clothes/all" :class="{'is-active': this.activeMenu === 'clothes'}">All Clothes</router-link></li>
            <li><router-link to="/closet/mxm/all" :class="{'is-active': this.activeMenu === 'mxm'}">All MxMs</router-link></li>
          </ul>
        </aside>
      </div>
      <div id="closet-content-wrapper" class="column is-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CLOSET_CHANGE_MENU } from '../store/types'
export default {
  computed: {
    ...mapGetters({
      activeMenu: 'closetActiveMenu'
    })
  },

  mounted () {
    this.$store.commit(CLOSET_CHANGE_MENU, {
      path: this.$route.path
    })
  },

  watch: {
    $route (to, from) {
      this.$store.commit(CLOSET_CHANGE_MENU, {
        path: to.path
      })
    }
  }
}
</script>

<style scoped>

</style>
