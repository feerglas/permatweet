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
      :disabled="!inputValid"
      @click="getTweet"
    >
      Get tweet
    </v-btn>
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
  methods: {
    async getTweet () {
      const url = `./.netlify/functions/twitter?id=${this.input}`

      try {
        const data = await fetch(url)
        const response = await data.json()

        console.log(response)
      } catch (error) {
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
