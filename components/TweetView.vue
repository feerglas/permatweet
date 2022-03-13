<template>
  <div>
    <p>
      here we will place a preview of the tweet. same markup will be used to store the tweet into arweave.
    </p>

    <p v-if="tweetContent">
      tweet content received. The received json is now available under the variable "tweetContent"
    </p>
  </div>
</template>

<script>
export default {
  name: 'TweetView',
  computed: {
    tweetContent () {
      return this.$store.state.twitter.tweetContent
    }
  }
}
</script>

<style>
</style>
