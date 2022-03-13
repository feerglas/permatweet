<template>
  <div>
    confirmations: {{ confirmations }}

    <p v-if="confirmed">
      YES, storing your tweet to arweave has been cofirmed!
    </p>
  </div>
</template>

<script>
import { checkStatus } from '../web3/arweave'
import {
  getTranscationId,
  removeTransactionId
} from '../localStorage'

const startChecking = async (id, store) => {
  store.commit('arweave/confirming', true)

  console.log('start checking')

  await checkStatus(id, store)

  store.commit('arweave/confirming', false)

  console.log('finish checking')

  removeTransactionId()
}

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
        await startChecking(newId, this.$store)
      }
    }
  },
  async created () {
    const transactionId = getTranscationId()

    if (transactionId) {
      await startChecking(getTranscationId(), this.$store)
    }
  }
}

</script>
