<template>
  <div v-if="tweetContent">
    <!-- As a little reminder, if a tweet contains URLs we could/should also
    fetch/wget these the URLs and store them in arweave and swap the URL
    with the local filepath. This can get pretty complex quite fast. Maybe
    it would be better to use an already existing service like
    the waybackmachine.org or archive.is to have persistent URLs/data. But -->

    <!-- We need to create a HTML file after successfully fetching the tweet and
    reference the created HTML file within the iFrame -->
    <!-- <iframe :src="tweetContent.html" width="100%" height="500px"></iframe> -->
    <article class="tweet">
      <h1>
        <!-- We need to create links/anchor tags if there are links within the tweet -->
        {{ tweetContent.data.text }}
      </h1>
      <p>
        <span>Tweet author: {{ tweetContent.data.author_id }}</span> <span>aka</span> <span>{{ tweetContent.includes.users[0].username }}</span>
      </p>
      <p>
        Tweet created: <date>{{ tweetContent.data.created_at }}</date>, Tweet permanently saved: <date>CURRENT DATE/TIME</date>
      </p>
    </article>
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

<!-- Add basic test styling -->
<style>
  .tweet { border: 1px solid #ccc; border-radius: 0.5rem; margin-block-start: 7em; margin-block-end: 7em; padding: 1rem; transform: skew(-3deg, 9deg); box-shadow: 1.25rem -0.5rem 2rem -0.7rem rgba(255,0,183,0.83); }
</style>
