<template>
  <div class="container">
  <section class="hero">
    <div class="hero-title">
      <h1 class="title">
        MxM Plaza #{{mxm.id}}
      </h1>
      <h2 v-if= "mxm.is_on_recommendation==true" class="subtitle">
        Give A Recommendation For A Better MxM #{{mxm.id}}
      </h2>
      <h2 v-if= "mxm.is_on_evaluation==true" class="subtitle">
        Evaluate MxM #{{mxm.id}}
      </h2>
      <br/>
    </div>
    <div class = "container">
      <div id="mxm-plaza-detail-wrapper">
         <span v-for="cloth in mxm.clothes">
            <img class="pic" v-bind:src="cloth.image" width='200'>
         </span>
      </div>
        <textarea v-if= "mxm.is_on_recommendation==true" v-model="reply_content" rows='6' cols='80'  placeholder="Give a recommendation :) "></textarea>
      <br/>
        <div style="display:inline-block;">
          <star-rating v-if= "mxm.is_on_evaluation==true" v-model = "ratings" v-bind:max-rating="10" :show-rating="false" ></star-rating>
          <br/>
          <textarea v-if= "mxm.is_on_evaluation==true" v-model="comment" rows='6' cols='80'  placeholder="Leave a comment :) "></textarea>
        </div>
      <br/>
      <br/>
        <button class= "button is-medium" v-if= "mxm.is_on_recommendation==true" v-on:click="save_replies">Save</button>
        <button class= "button is-medium" v-if= "mxm.is_on_evaluation==true" v-on:click="save_ratings">Save</button>
      <router-link :to="`/plaza/`" class="is-active">
        <button class = "button is-medium" >Back to List</button>
      </router-link>
    </div>
  </section>
  </div>
</template>


<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
export default {
  created () {
    this.$store.dispatch('MXM_PLAZA_DETAIL_LOAD', this.$route.params.id)
  },
  computed: {
    mxm () {
      return this.$store.getters.mxm
    }
  },
  components: {
    StarRating
  },
  methods: {
    save_replies: function () {
      axios.post('/api/replies/', {
        author: 1,
        mxm: this.$route.params.id,
        reply_content: this.reply_content
      })
      .then(response => {
        this.$toast.open({
          duration: 3000,
          message: `Your reply is saved successfully`,
          position: 'is-top',
          type: 'is-success'
        })
      })
      .catch(error => {
        console.log(error.response)
        this.$toast.open({
          duration: 3000,
          message: `Couldn't save your reply.`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    },
    save_ratings: function () {
      axios.post('/api/ratings/', {
        author: 1,
        mxm: this.$route.params.id,
        comment: this.comment,
        stars: this.ratings
      })
      .then(response => {
        this.$toast.open({
          duration: 3000,
          message: `Your ratings is saved successfully`,
          position: 'is-top',
          type: 'is-success'
        })
      })
      .catch(error => {
        console.log(error.response)
        this.$toast.open({
          duration: 3000,
          message: `Couldn't save your ratings.`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}

</style>
