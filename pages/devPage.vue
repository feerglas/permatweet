<template>
  <v-row justify="center" align="center">
    <v-btn
      v-for="button in buttons"
      :key="button.text"
      rounded
      color="primary"
      dark
      small
      @click="button.method"
    >
      {{ button.text }}
    </v-btn>
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
import { resetAll } from '../helpers/store'
import renderTweet from '../helpers/renderTweet'
import {
  sampleTweetId,
  sampleTransactionId,
  sampleTweetData
} from '../helpers/testData'

const renderedTweetComponent = renderTweet(sampleTweetData, false)
const renderedTweetDocument = renderTweet(sampleTweetData, true)

export default {
  name: 'DevPage',
  data () {
    return {
      buttons: [
        {
          text: 'Get tweet',
          method: this.devGetTweet
        },
        {
          text: 'Already saved',
          method: this.devAlreadySaved
        },
        {
          text: 'Store tweet',
          method: this.devStoreTweet
        },
        {
          text: 'Store confirming',
          method: this.devStoreConfirming
        }
      ]
    }
  },
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
  },
  methods: {
    devGetTweet () {
      resetAll(this.$store)
    },
    devAlreadySaved () {
      resetAll(this.$store)

      this.$store.commit('twitter/tweetAlreadySaved', sampleTransactionId)
      this.$store.commit('twitter/tweetId', sampleTweetId)
      this.$store.commit('twitter/tweetContentComponent', renderedTweetComponent)
      this.$store.commit('twitter/tweetContentDocument', renderedTweetDocument)
      this.$store.commit('twitter/tweetData', sampleTweetData)
    },
    devStoreTweet () {
      resetAll(this.$store)

      this.$store.commit('twitter/tweetAlreadySaved', false)
      this.$store.commit('arweave/id', false)
      this.$store.commit('arweave/error', false)
      this.$store.commit('twitter/tweetContentComponent', renderedTweetComponent)
      this.$store.commit('twitter/tweetContentDocument', renderedTweetDocument)
      this.$store.commit('twitter/tweetId', sampleTweetId)
      this.$store.commit('twitter/tweetData', sampleTweetData)
    },
    devStoreConfirming () {
      resetAll(this.$store)

      this.$store.commit('twitter/tweetData', sampleTweetData)
      this.$store.commit('arweave/setConfirmations', 3)
      this.$store.commit('arweave/confirming', true)
      this.$store.commit('arweave/confirmed', false)
      this.$store.commit('arweave/id', sampleTransactionId)
      this.$store.commit('twitter/tweetContentComponent', renderedTweetComponent)
      this.$store.commit('twitter/tweetContentDocument', renderedTweetDocument)
    }
  }
}
</script>
