<template>
  <div>
    confirmations: {{ confirmations }}

    <p v-if="confirmed">
      YES, storing your tweet to arweave has been cofirmed!
    </p>
  </div>
</template>

<script>
import checkStatus from '../web3/transactionStatus'
import localStorage from '../localStorage'

export default {
  name: 'StoreArweaveState',
  computed: {
    confirmations () {
      return this.$store.state.arweave.confirmations
    },
    confirmed () {
      return this.$store.state.arweave.confirmed
    },
    trxId () {
      return this.$store.state.arweave.id
    }
  },
  watch: {
    async trxId (newId, oldId) {
      this.$store.commit('arweave/confirming', false)
      this.$store.commit('arweave/setConfirmations', 0)
      this.$store.commit('arweave/confirmed', false)

      if (!oldId && newId) {
        this.$store.commit('arweave/confirming', true)

        console.log('start checking')

        try {
          await checkStatus(newId, this.$store)

          this.$store.commit('arweave/confirming', false)

          console.log('finish checking')

          if (this.confirmed) {
            localStorage.transactionId.remove()
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  created () {
    const transactionId = localStorage.transactionId.get()

    if (transactionId) {
      this.$store.commit('arweave/id', transactionId)
    }
  }
}

</script>
