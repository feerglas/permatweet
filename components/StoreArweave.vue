<template>
  <div>
    <v-btn
      elevation="2"
      large
      x-large
      :disabled="!tweetContentDocument || storing || confirming || tweetFetching || tweetAlreadySaved !== false"
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
import storeOnArweave from '../web3/storeTransaction'
import { setTranscationId } from '../localStorage'

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
    tweetContentDocument () {
      return this.$store.state.twitter.tweetContentDocument
    },
    tweetId () {
      return this.$store.state.twitter.tweetId
    },
    tweetFetching () {
      return this.$store.state.twitter.fetching
    },
    tweetAlreadySaved () {
      return this.$store.state.twitter.tweetAlreadySaved
    }
  },
  methods: {
    async store () {
      try {
        this.$store.commit('arweave/storing', true)
        this.$store.commit('arweave/error', false)
        this.$store.commit('arweave/id', false)
        const trxId = await storeOnArweave(this.tweetContentDocument, this.tweetId)
        this.$store.commit('arweave/storing', false)
        this.$store.commit('arweave/id', trxId)
        setTranscationId(trxId)
      } catch (e) {
        console.log(e)
        this.$store.commit('arweave/storing', false)
        this.$store.commit('arweave/error', true)
      }
    }
  }
}

</script>
