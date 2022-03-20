<template>
  <div>
    <v-btn
      :nuxt="true"
      to="/"
      class="mb-8"
    >
      Back to Home
    </v-btn>
    <v-data-table
      :headers="tableHeaders"
      :items="tableItems"
      :single-expand="true"
      show-expand
      item-key="transaction._id"
      :items-per-page="50"
      class="elevation-2 mb-12"
      :loading="loading"
    >
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <p class="pt-4">
            Transaction ID: {{ item.transaction._id }}
            <CopyToClipboard :text-to-copy="item.transaction._id" />
            <br>

            Who saved it? {{ item.transaction._owner.address }}
            <CopyToClipboard :text-to-copy="item.transaction._owner.address" />
            <br>

            <ButtonLink
              :link="linkToBlockchain(item.transaction._id)"
              text="View Tweet"
              icon="mdi-twitter"
            />
            <ButtonLink
              :link="linkToTransaction(item.transaction._id)"
              text="View Transaction"
              icon="mdi-link-lock"
            />
          </p>
        </td>
      </template>
    </v-data-table>
  </div>
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
      loading: true
    }
  },
  async created () {
    const rawData = await getAllTransactions()

    this.tableHeaders = [
      {
        text: 'Tweet created',
        value: 'tweetCreatedDate'
      },
      {
        text: 'Tweet saved',
        value: 'tweetSavedDate'
      },
      {
        text: 'Tweet author id',
        value: 'tweetAuthorId',
        sortable: false
      },
      {
        text: 'Tweet author user',
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
  },
  methods: {
    linkToBlockchain (id) {
      return `${config.arweaveNet}/${id}`
    },
    linkToTransaction (id) {
      return `${config.blockExplorer}/${id}`
    }
  }
}
</script>
