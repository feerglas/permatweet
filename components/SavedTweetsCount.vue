<template>
  <div>
    saved tweets: 0
  </div>
</template>

<script>
import Arweave from 'arweave'
import { queryAllSavedTweets } from '../web3/queries'

const arweave = Arweave.init()

export default {
  name: 'SavedTweetsCount',
  async mounted () {
    try {
      const results = await arweave.api.post('/graphql', queryAllSavedTweets)
      const edges = results.data.data.transactions.edges
      console.log(edges)
    } catch (err) {
      console.error('GraphQL query failed')
      throw new Error(err)
    }
  }
}

</script>
