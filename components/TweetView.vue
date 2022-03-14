<template>
  <div v-if="tweetContent" v-html="tweetContent" />
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
