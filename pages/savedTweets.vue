<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableItems"
    :single-expand="true"
    show-expand
    item-key="transactionId"
    :items-per-page="50"
    class="elevation-2"
    :loading="loading"
  >
    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <p>
          Link: {{ config.blockExplorer }}/{{ item.transaction._id }}<br>
          Transaction ID: {{ item.transaction._id }}<br>
          Transaction Owner: {{ item.transaction._owner.address }}<br>
        </p>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { getAllTransactions } from '../web3/queries'
import {
  config,
  transactionTagKeys
} from '../web3/config'
import { formatDate } from '../helpers/date'

export default {
  name: 'SavedTweets',
  data () {
    return {
      tableHeaders: [],
      tableItems: [],
      loading: true,
      config
    }
  },
  async created () {
    const rawData = await getAllTransactions()

    this.tableHeaders = [
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
        value: 'tweetAuthorId',
        sortable: false
      },
      {
        text: 'Tweet author username',
        value: 'tweetAuthorUsername',
        sortable: false
      },
      {
        text: 'Tweet preview',
        value: 'tweetPreview',
        sortable: false
      },
      {
        text: 'Tweet Id',
        value: 'tweetId',
        sortable: false
      }
    ]

    this.tableItems = rawData.map((item) => {
      return {
        transaction: item,
        tweetCreatedDate: formatDate(new Date(parseInt(item.tags[transactionTagKeys.tweetCreatedDate]))),
        tweetSavedDate: formatDate(new Date(parseInt(item.tags[transactionTagKeys.tweetSavedDate]))),
        tweetAuthorId: item.tags[transactionTagKeys.tweetAuthorId],
        tweetAuthorUsername: item.tags[transactionTagKeys.tweetAuthorName],
        tweetPreview: item.tags[transactionTagKeys.tweetContentPreview],
        tweetId: item.tags[transactionTagKeys.tweetId]
      }
    })

    this.loading = false
  }
}
</script>
