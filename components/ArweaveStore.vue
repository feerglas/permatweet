<template>
  <div>
    <v-card>
      <v-card-title>Store tweet</v-card-title>

      <v-card-text>
        <p>
          Is this the tweet you want to store? Forever? Great, go ahead and store it!
        </p>
        <p>
          Tweet id: {{ tweetId }}
        </p>
        <TweetView />

        <v-btn
          elevation="2"
          large
          x-large
          :disabled="storing"
          :loading="storing"
          @click="store"
        >
          Store tweet
        </v-btn>

        <p v-if="error">
          There was an error storing the information to the blockchain. Please try again.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import storeOnArweave from '../web3/storeTransaction'

export default {
  name: 'ArweaveStore',
  computed: {
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
    tweetData () {
      return this.$store.state.twitter.tweetData
    },
    tweetId () {
      return this.$store.state.twitter.tweetId
    }
  },
  methods: {
    async store () {
      try {
        this.$store.commit('arweave/storing', true)
        this.$store.commit('arweave/error', false)
        this.$store.commit('arweave/id', false)
        const trxId = await storeOnArweave(this.tweetContentDocument, this.tweetId, this.tweetData)
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
