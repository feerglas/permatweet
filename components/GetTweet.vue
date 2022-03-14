<template>
  <div>
    <v-text-field
      v-model="input"
      label="Tweet ID"
      :disabled="(fetching || confirming || arweaveStoring)"
      @input.native="handleInputChange"
    />
    <v-btn
      elevation="2"
      large
      x-large
      :disabled="(!inputValid || fetching || confirming || arweaveStoring)"
      @click="getTweet"
    >
      Get tweet
    </v-btn>
    <p v-if="fetchError">
      There was an error fetching the information from twitter. Please be sure to provide a valid Tweet-Id.
    </p>
    <p v-if="tweetAlreadySaved">
      This tweet has already been saved. Transaction id is: {{ tweetAlreadySaved }}
    </p>
  </div>
</template>

<script>
import { getAllTransactions } from '../web3/queries'
import renderTweet from '../helpers/renderTweet'
import localStorage from '../localStorage'

const _getTweet = async (store, input) => {
  store.commit('twitter/fetchError', false)
  store.commit('twitter/fetching', true)
  store.commit('twitter/tweetContentDocument', false)
  store.commit('twitter/tweetAlreadySaved', false)

  try {
    const transactions = await getAllTransactions()

    let alreadyThere = false
    transactions.forEach((trx) => {
      trx._tags.forEach((tag) => {
        if (tag.name === 'Tweet-Id' && tag.value === input) {
          alreadyThere = true
          store.commit('twitter/tweetAlreadySaved', trx._id)
        }
      })
    })

    store.commit('twitter/tweetId', input)

    const url = `./.netlify/functions/twitter?id=${input}`
    const data = await fetch(url)

    store.commit('twitter/fetching', false)

    if (data.status !== 200) {
      store.commit('twitter/fetchError', true)
      throw (new Error('there was an error'))
    }

    const response = await data.json()

    const renderedTweetComponent = renderTweet(response, false)
    store.commit('twitter/tweetContentComponent', renderedTweetComponent)
    localStorage.tweetId.set(input)

    if (alreadyThere) {
      return
    }

    const renderedTweetDocument = renderTweet(response, true)

    store.commit('twitter/tweetContentDocument', renderedTweetDocument)
    store.commit('twitter/tweetData', response)
  } catch (error) {
    store.commit('twitter/fetching', false)
    store.commit('twitter/fetchError', true)
    store.commit('twitter/tweetAlreadySaved', false)
    console.log(error)
  }
}

export default {
  name: 'GetTweet',
  data () {
    return {
      input: '',
      inputValid: false
    }
  },
  computed: {
    fetchError () {
      return this.$store.state.twitter.fetchError
    },
    fetching () {
      return this.$store.state.twitter.fetching
    },
    tweetContentDocument () {
      return this.$store.state.twitter.tweetContentDocument
    },
    tweetAlreadySaved () {
      return this.$store.state.twitter.tweetAlreadySaved
    },
    arweaveStoring () {
      return this.$store.state.arweave.storing
    },
    confirming () {
      return this.$store.state.arweave.confirming
    }
  },
  async created () {
    const tweetId = localStorage.tweetId.get()

    if (tweetId) {
      this.input = tweetId
      await _getTweet(this.$store, tweetId)

      this.$store.commit('twitter/fetching', false)
    }
  },
  methods: {
    async getTweet () {
      await _getTweet(this.$store, this.input)
    },
    handleInputChange () {
      this.inputValid = this.input.length > 0
    }
  }
}
</script>

<style>
</style>
