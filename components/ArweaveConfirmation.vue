<template>
  <div v-if="trxId && tweetData">
    <v-card
      elevation="2"
    >
      <v-card-title>Confirmation</v-card-title>

      <v-card-text>
        <p>
          <b>Remember to save the link to the tweet somewhere!</b> The network is busy on storing the tweet. You can stay here and wait for confirmations of the network, or check out the links to see if the tweet has already been saved:
        </p>

        <SavedTweetInfo class="mb-6" />

        <p v-if="!confirmed">
          confirmations: {{ confirmations }}
        </p>

        <p v-if="confirmed">
          YES, storing your tweet to arweave has been cofirmed!
        </p>

        <TweetView />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import checkStatus from '../web3/transactionStatus'

export default {
  name: 'ArweaveConfirmation',
  computed: {
    tweetData () {
      return this.$store.state.twitter.tweetData
    },
    confirmations () {
      return this.$store.state.arweave.confirmations
    },
    confirmed () {
      return this.$store.state.arweave.confirmed
    },
    trxId () {
      return this.$store.state.arweave.id
    }
  },
  watch: {
    async trxId (newId, oldId) {
      this.$store.commit('arweave/confirming', false)
      this.$store.commit('arweave/setConfirmations', 0)
      this.$store.commit('arweave/confirmed', false)

      if (!oldId && newId) {
        this.$store.commit('arweave/confirming', true)

        console.log('start checking')

        try {
          await checkStatus(newId, this.$store)

          this.$store.commit('arweave/confirming', false)

          console.log('finish checking')
        } catch (err) {
          console.log(err)

          this.$store.commit('arweave/confirming', false)
        }
      }
    }
  }
}

</script>
