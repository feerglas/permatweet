<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Permatweet
        </v-card-title>
        <v-card-text>
          <p>Store tweets on the Arweave Blockchain on demand..</p>
        </v-card-text>
      </v-card>
      <GetTweet />
      <TweetView v-if="tweetContent" />
      <StoreArweave />
      <StoreArweaveState />
      <SavedTweetsCount />

      <p>Keep in mind: you need the ArConnect Browser Extension installed for this App to work. You can get it here: <a href="https://www.arconnect.io/" rel="noopener noreferrer" target="_blank">https://www.arconnect.io/</a></p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    tweetContent () {
      return this.$store.state.twitter.tweetContent
    }
  }
}
</script>
