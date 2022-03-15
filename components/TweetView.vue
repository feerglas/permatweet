<template>
  <div
    class="px-8"
    v-html="tweetContentComponent"
  />
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
