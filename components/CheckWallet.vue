<template>
  <v-alert
    v-if="!walletInstalled && isWaiting"
    color="red"
    outlined
    type="warning"
    class="my-12"
  >
    Keep in mind: you need the ArConnect Browser Extension installed for this App to work. You can get it here: <a href="https://www.arconnect.io/" rel="noopener noreferrer" target="_blank">https://www.arconnect.io/</a>
  </v-alert>
</template>

<script>

export default {
  name: 'CheckWallet',
  data () {
    return {
      walletInstalled: true,
      isWaiting: true
    }
  },
  mounted () {
    window.setTimeout(() => {
      // probably, arConnect is already ready
      if (window.arweaveWallet !== undefined) {
        this.isWaiting = false
        return
      }

      // otherwise we listen to the event
      this.walletInstalled = false
      window.addEventListener('arweaveWalletLoaded', this.handleConnected)
    }, 2000)
  },
  beforeUnmount () {
    window.removeEventListener('arweaveWalletLoaded', this.handleConnected)
  },
  methods: {
    handleConnected () {
      this.walletInstalled = window.arweaveWallet !== undefined
      this.isWaiting = false
    }
  }
}
</script>
