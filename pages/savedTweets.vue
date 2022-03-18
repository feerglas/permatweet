<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="50"
    class="elevation-2"
  />
</template>

<script>
import { getAllTransactions } from '../web3/queries'
import { transactionTagKeys } from '../web3/config'

export default {
  name: 'SavedTweets',
  data () {
    return {
      headers: [],
      items: []
    }
  },
  async created () {
    const rawData = await getAllTransactions()

    this.headers = [
      {
        text: 'Transaction ID',
        value: 'transactionId'
      },
      {
        text: 'Transaction Owner',
        value: 'transactionOwner'
      },
      {
        text: 'Tweet Id',
        value: 'tweetId'
      },
      {
        text: 'Tweet created date',
        value: 'tweetCreatedDate'
      },
      {
        text: 'Tweet saved date',
        value: 'tweetSavedDate'
      },
      {
        text: 'Tweet author id',
        value: 'tweetAuthorId'
      },
      {
        text: 'Tweet author username',
        value: 'tweetAuthorUsername'
      },
      {
        text: 'Tweet preview',
        value: 'tweetPreview'
      }
    ]

    this.items = rawData.map((item) => {
      return {
        transactionId: item._id,
        transactionOwner: item._owner.address,
        tweetId: item.tags[transactionTagKeys.tweetId],
        tweetCreatedDate: item.tags[transactionTagKeys.tweetCreatedDate],
        tweetSavedDate: item.tags[transactionTagKeys.tweetSavedDate],
        tweetAuthorId: item.tags[transactionTagKeys.tweetAuthorId],
        tweetAuthorUsername: item.tags[transactionTagKeys.tweetAuthorName],
        tweetPreview: item.tags[transactionTagKeys.tweetContentPreview]
      }
    })
  }
}
</script>
