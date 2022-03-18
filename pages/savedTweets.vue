<template>
  <div>
    {{ transactions.map((transaction) => {
      return `trx: ${transaction.id}`
    }) }}
  </div>
</template>

<script>
import { getAllTransactions } from '../web3/queries'

export default {
  name: 'SavedTweets',
  data () {
    return {
      transactions: []
    }
  },
  async mounted () {
    const transactions = await getAllTransactions()

    console.log(transactions)
  }
}
</script>
