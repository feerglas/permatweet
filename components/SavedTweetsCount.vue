<template>
  <div>
    <v-chip
      class="ma-2"
      color="green"
      text-color="white"
    >
      <v-avatar
        left
        class="green darken-4"
      >
        <v-skeleton-loader
          v-if="queryingTrxCount"
          class="mx-auto"
          type="avatar"
        />
        <span v-if="!queryingTrxCount && trxCount">
          {{ trxCount }}
        </span>
      </v-avatar>
      tweets have already been saved with this tool.
    </v-chip>
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
  beforeCreate () {
    this.$store.commit('graphql/queryingTrxCount', true)
  },
  async mounted () {
    const allTransactions = await getAllTransactions()

    this.$store.commit('graphql/queryingTrxCount', false)

    if (allTransactions) {
      this.$store.commit('graphql/trxCount', allTransactions.length)
    }
  }
}

</script>
