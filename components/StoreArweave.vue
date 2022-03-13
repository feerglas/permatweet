<template>
  <div>
    <v-btn
      elevation="2"
      large
      x-large
      :disabled="!tweetContent || storing || confirming || tweetFetching"
      @click="store"
    >
      Store tweet
    </v-btn>

    <p v-if="error">
      There was an error storing the information to the blockchain.
    </p>

    <p v-if="id">
      The info was submitted to the blockchain with the transaction id: {{ id }}
    </p>
  </div>
</template>

<script>
import { storeOnArweave } from '../web3/arweave'

export default {
  name: 'StoreArweave',
  computed: {
    confirming () {
      return this.$store.state.arweave.confirming
    },
    error () {
      return this.$store.state.arweave.error
    },
    id () {
      return this.$store.state.arweave.id
    },
    storing () {
      return this.$store.state.arweave.storing
    },
    tweetContent () {
      return this.$store.state.twitter.tweetContent
    },
    tweetId () {
      return this.$store.state.twitter.tweetId
    },
    tweetFetching () {
      return this.$store.state.twitter.fetching
    }
  },
  methods: {
    async store () {
      try {
        this.$store.commit('arweave/storing', true)
        this.$store.commit('arweave/error', false)
        this.$store.commit('arweave/id', false)
        const trxId = await storeOnArweave(this.tweetContent, this.tweetId)
        this.$store.commit('arweave/storing', false)
        this.$store.commit('arweave/id', trxId)
      } catch (e) {
        console.log(e)
        this.$store.commit('arweave/storing', false)
        this.$store.commit('arweave/error', true)
      }
    }
  }
}

</script>
