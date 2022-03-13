<template>
  <div>
    <p v-if="queryingTrxCount">
      Fetching count...
    </p>

    <p v-if="!queryingTrxCount && trxCount">
      {{ trxCount }} tweets in total have been saved with this tool.
    </p>
  </div>
</template>

<script>
import { getAllTransactions } from '../web3/queries'

export default {
  name: 'SavedTweetsCount',
  computed: {
    queryingTrxCount () {
      return this.$store.state.graphql.queryingTrxCount
    },
    trxCount () {
      return this.$store.state.graphql.trxCount
    }
  },
  async mounted () {
    this.$store.commit('graphql/queryingTrxCount', true)
    const allTransactions = await getAllTransactions()

    this.$store.commit('graphql/queryingTrxCount', false)

    if (allTransactions) {
      this.$store.commit('graphql/trxCount', allTransactions.length)
    }
  }
}

</script>
