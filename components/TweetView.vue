<template>
  <div v-html="tweetContentComponent" />
</template>

<script>
export default {
  name: 'TweetView',
  computed: {
    tweetContentComponent () {
      return this.$store.state.twitter.tweetContentComponent
    }
  }
}
</script>
