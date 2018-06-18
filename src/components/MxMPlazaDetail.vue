<template>
  <div class="container">
  <section class="hero">
    <section class="hero is-primary" id="header">
      <div class="hero-body">
        <h1 class="title is-1" id="header-text">MxM Plaza Detail</h1>
        <h2 v-if= "mxm.is_on_recommendation==true" class="title is-4">
          Give A Recommendation For A Better MxM #{{mxm.id}}
        </h2>
        <h2 v-if= "mxm.is_on_evaluation==true"  class="title is-4">
          Evaluate MxM #{{mxm.id}}
        </h2>
      </div>
    </section>

    <div class="container">
      <div id="mxm-plaza-detail-wrapper">

        <div class="card" :id="mxm.id">
          <header class="card-header">
            <div class="title">
              MxM #{{ mxm.id }}
            </div>
            <div class="owner">
              by {{ users.find(user => user.id === mxm.owner).username }}
            </div>
          </header>

          <div class="card-content">
            <b-tooltip label="Click to see clothes info">
              <span v-for="cloth in mxm.clothes">
                <router-link :to="`/closet/clothes/detail/${cloth.id}`" class="is-active">
                  <img class="pic" v-bind:src="cloth.image">
                </router-link>
              </span>
            </b-tooltip>
          </div>
        </div>

        <div v-if= "mxm.is_on_recommendation==true" class="card" :id="mxm.id">
          <header class="card-header">
            <div class="title">
              Other's Recommendation
            </div>
          </header>

          <div class="card-content">
            <div v-for="rec in reply">
              <div class="description">
                Recommedation #{{rec.id}}
              </div>
              comment: {{rec.reply_content}}
            </div>
          </div>
        </div>

        <div  v-if= "mxm.is_on_recommendation==true" class="card" :id="mxm.id">
          <header class="card-header">
            <div class="title">
              Give a recommendation
            </div>
          </header>

          <div class="card-content">
            <button class= "button is-medium" v-on:click="recFromAllClothes">Recommend From All Clothes</button>
            <button class= "button is-medium" v-on:click="recFromUserClothes">Recommend From User's Clothes</button>
            <br/>
            <b-tooltip label="Click to select">
              <transition-group>
                <img v-for="(cloth, index) in clothesNotInRec" class="pic" v-on:click="addToRec(index)" v-bind:src="cloth.image" width='200' :key="cloth.id">
              </transition-group>
            </b-tooltip>
            <br/>
            <div class="description">
              Clothes selected for recommendation
            </div>
            <b-tooltip label="Click to undo">
              <transition-group>
                <img v-for="(cloth, index) in clothesInRec" class="pic" v-on:click="removeFromRec(index)" v-bind:src="cloth.image" width='200' :key="cloth.id">
              </transition-group>
            </b-tooltip>
            <br/>
            <textarea v-model="reply_content" rows='6' cols='120'  placeholder="Give a recommendation :) "></textarea>
            <br/>
              <button class= "button is-medium" v-on:click="save_replies">Save</button>
            <router-link :to="`/plaza/`" class="is-active">
              <button class = "button is-medium" >Back to List</button>
            </router-link>

          </div>
        </div>

        <div v-if= "mxm.is_on_evaluation==true" class="card" :id="mxm.id">
          <header class="card-header">
            <div class="title">
              Other's Ratings
            </div>
          </header>

          <div v-if= "mxm.is_on_evaluation==true" class="card" :id="mxm.id">
            <header class="card-header">
              <div class="title">
                Evaluate this MxM
              </div>
            </header>

            <div class="card-content">
              <star-rating v-model = "ratings" v-bind:max-rating="10" :show-rating="false" ></star-rating>
              <br/>
              <textarea v-model="comment" rows='6' cols='120'  placeholder="Leave a comment :) "></textarea>
              <br/>
                <button class= "button is-medium" v-on:click="save_ratings">Save</button>
              <router-link :to="`/plaza/`" class="is-active">
                <button class = "button is-medium" >Back to List</button>
              </router-link>

            </div>
          </div>

          <div class="card-content">
            <div class="description">
              Average Ratings
            </div>
            <star-rating :rating="mxm.average_rating" v-bind:max-rating="10" :read-only="true" :increment="0.01"></star-rating>
            <div v-for="rate in rating">
              <div class="description">
                Ratings#{{rate.id}}
              </div>
               <star-rating :rating="rate.stars" v-bind:max-rating="10" :read-only="true"></star-rating>
               comment: {{rate.comment}}
            </div>
          </div>
        </div>

      </div>
    </div>

  </section>
  </div>
</template>


<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'
export default {
  created () {
    axios
    .get('/api/mxms/' + this.$route.params.id)
    .then(res => res.data)
    .then(mxm => {
      this.mxm = mxm
    })
    axios
    .get('/api/ratings/mxm=' + this.$route.params.id + '/page=1')
    .then(res => res.data)
    .then(rating => {
      this.rating = rating
    })
    axios
    .get('/api/replies/mxm=' + this.$route.params.id + '/page=1')
    .then(res => res.data)
    .then(reply => {
      this.reply = reply
    })
  },
  computed: {
    users () {
      return this.$store.getters.users
    }
  },
  data: function () {
    return {
      mxm: [],
      clothesNotInRec: [],
      clothesInRec: [],
      rating: [],
      reply: []
    }
  },
  components: {
    StarRating
  },
  methods: {
    recFromUserClothes: function () {
      axios
      .get('/api/clothes/user=' + this.mxm.owner + '/')
      .then(res => res.data)
      .then(clothesNotInRec => {
        this.clothesNotInRec = clothesNotInRec
      })
    },
    recFromAllClothes: function () {
      axios
      .get('/api/clothes/')
      .then(res => res.data)
      .then(clothesNotInRec => {
        this.clothesNotInRec = clothesNotInRec
      })
    },
    removeFromRec: function (index) {
    //  this.clothesNotInRec.splice(this.clothesNotInRec.length, 0, this.clothesInRec[index])
      this.clothesInRec.splice(index, 1)
    },
    addToRec: function (index) {
      this.clothesInRec.splice(this.clothesInRec.length, 0, this.clothesNotInRec[index])
    //  this.clothesNotInRec.splice(index, 1)
    },
    save_replies: function () {
      axios.post('/api/replies/', {
        author: this.$store.getters.user.id,
        mxm: this.$route.params.id,
        recommend_clothes: this.clothesInRec.map(cloth => cloth.id),
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
        author: this.$store.getters.user.id,
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
#header {
  margin-bottom: 48px;
}
#header-text {
  font-family: 'Rubik Mono One', sans-serif;
}
.title {
  color: #42b983;
  margin-top:15px;
  margin-left:15px;
  margin-bottom:15px;
}
.pic {
  object-fit: cover;
  position: relative;
  height: 200px;
  width: 150px;
}
.owner {
  font-size: 1.3em;
  margin-left: 30px;
  margin-top: 20px;
}
.description {
  font-size: 1.8em;
  margin-left: 15px;
  margin-top: 20px;
}

</style>
