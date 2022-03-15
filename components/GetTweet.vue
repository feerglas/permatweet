<template>
  <div>
    <v-card>
      <v-card-title>Get Tweet</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="input"
          label="Tweet ID"
          :disabled="fetching"
          @input.native="handleInputChange"
        />
        <v-btn
          elevation="2"
          x-large
          outlined
          :disabled="(!inputValid || fetching)"
          :loading="fetching"
          @click="getTweet"
        >
          Get tweet
        </v-btn>
        <p v-if="fetchError">
          There was an error fetching the information from twitter. Please be sure to provide a valid Tweet-Id.
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getAllTransactions } from '../web3/queries'
import renderTweet from '../helpers/renderTweet'
import { resetTwitter } from '../helpers/store'

const _getTweet = async (store, input) => {
  resetTwitter(store)

  try {
    store.commit('twitter/fetching', true)
    const transactions = await getAllTransactions()

    transactions.forEach((trx) => {
      trx._tags.forEach((tag) => {
        if (tag.name === 'Tweet-Id' && tag.value === input) {
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
    const renderedTweetDocument = renderTweet(response, true)

    store.commit('twitter/tweetContentComponent', renderedTweetComponent)
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
