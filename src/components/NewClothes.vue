<template>
  <div>
    <section>
      <b-field class="file">
        <b-upload v-model="files">
          <a class="button is-primary">
            <b-icon pack="fas" icon="upload"></b-icon>
            <span>Click to upload</span>
          </a>
        </b-upload>
        <span class="file-name"
          v-if="files && files.length">
          {{ files[0].name }}
        </span>
      </b-field>
      <b-taginput
        v-model="tags"
        :data="filteredTags"
        autocomplete
        field="content"
        placeholder="Add a tag"
        @typing="updateInput">
      </b-taginput>
    </section>
    <div class="level">
      <div class="level-left">
        <div class="level-item" />
      </div>
      <div class="level-right">
        <a @click="submit" class="button is-primary level-item">Submit</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NEW_CLOTHES_INIT,
         NEW_CLOTHES_TAG_INPUT,
         NEW_CLOTHES_SUBMIT } from '@/store/types'
export default {
  computed: {
    ...mapGetters({
      filteredTags: 'filteredTags'
    })
  },

  data () {
    return {
      files: [],
      tags: []
    }
  },

  mounted () {
    this.$store.dispatch(NEW_CLOTHES_INIT)
  },

  methods: {
    updateInput (text) {
      this.$store.commit(NEW_CLOTHES_TAG_INPUT, text)
    },

    submit () {
      this.$store.dispatch(NEW_CLOTHES_SUBMIT, {
        file: this.files[0],
        tags: this.tags
      })
    }
  }
}
</script>

<style scoped>

</style>
