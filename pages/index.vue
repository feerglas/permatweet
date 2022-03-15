<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8" lg="6">
      <PageHeader />

      <v-divider class="my-12" />

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

      <SavedTweetsCount class="my-12" />

      <StartNew
        v-if="tweetData"
        class="my-12"
      />

      <p class="my-12">
        Keep in mind: you need the ArConnect Browser Extension installed for this App to work. You can get it here: <a href="https://www.arconnect.io/" rel="noopener noreferrer" target="_blank">https://www.arconnect.io/</a>
      </p>
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
