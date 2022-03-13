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

        await checkStatus(newId, this.$store)

        this.$store.commit('arweave/confirming', false)

        console.log('finish checking')
      }
    }
  },
  async created () {
    // console.log('start checking')

    // this.$store.commit('arweave/confirming', true)
    // this.$store.commit('arweave/setConfirmations', 0)
    // this.$store.commit('arweave/confirmed', false)

    // const status = await checkStatus('iONBCkEQ3EGl1e7Pm4gXcwpaxnOPDDckrYys_aZQDkk', this.$store)
    // this.$store.commit('arweave/confirming', false)

    // console.log('finish checking')
    // console.log(status)
  }
}

</script>
