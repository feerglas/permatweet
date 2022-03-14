<template>
  <div v-if="tweetContentDocument" v-html="tweetContentDocument" />
</template>

<script>
export default {
  name: 'TweetView',
  computed: {
    tweetContentDocument () {
      return this.$store.state.twitter.tweetContentDocument
    }
  }
}
</script>
