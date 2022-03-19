<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" lg="6">
      <!-- Screen 1: get tweet -->
      <GetTweet v-if="!tweetData && !trxId" />

      <!-- Screen 2a: tweet has already been saved -->
      <AlreadyStored v-if="tweetData && tweetAlreadySaved && !trxId" />

      <!-- Screen 2b: tweet has not been saved before -->
      <div v-if="tweetData && !tweetAlreadySaved && !trxId">
        <ArweaveStore />
      </div>

      <!-- Screen 3: show confirmation -->
      <ArweaveConfirmation />

      <StartNew
        v-if="tweetData"
        class="my-12"
      />

      <CheckWallet />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    tweetData () {
      return this.$store.state.twitter.tweetData
    },
    tweetAlreadySaved () {
      return this.$store.state.twitter.tweetAlreadySaved
    },
    trxId () {
      return this.$store.state.arweave.id
    }
  }
}
</script>
