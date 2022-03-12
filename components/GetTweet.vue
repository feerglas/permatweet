<template>
  <div>
    <v-text-field
      v-model="input"
      label="Tweet ID"
      placeholder="asdf"
      @input.native="handleInputChange"
    />
    <v-btn
      elevation="2"
      large
      x-large
      :disabled="!inputValid || fetching"
      @click="getTweet"
    >
      Get tweet
    </v-btn>
    <p v-if="fetchError">
      There was an error fetching the information from twitter. Please be sure to provide a valid Tweet-Id.
    </p>
  </div>
</template>

<script>
export default {
  name: 'GetTweet',
  data () {
    return {
      input: '1502533647336972290',
      inputValid: false
    }
  },
  computed: {
    fetchError () {
      return this.$store.state.twitter.fetchError
    },
    fetching () {
      return this.$store.state.twitter.fetching
    },
    tweetContent () {
      return this.$store.state.twitter.tweetContent
    }
  },
  methods: {
    async getTweet () {
      this.$store.commit('twitter/fetchError', false)
      this.$store.commit('twitter/fetching', true)
      this.$store.commit('twitter/tweetContent', false)

      const url = `./.netlify/functions/twitter?id=${this.input}`

      try {
        const data = await fetch(url)
        const response = await data.json()

        this.$store.commit('twitter/fetching', false)

        if (data.status !== 200) {
          this.$store.commit('twitter/fetchError', true)
          throw (new Error('there was an error'))
        }

        this.$store.commit('twitter/tweetContent', response)
      } catch (error) {
        this.$store.commit('twitter/fetchError', true)
        console.log(error)
      }
    },
    handleInputChange () {
      this.inputValid = this.input.length > 0
    }
  }
}
</script>

<style>
</style>
