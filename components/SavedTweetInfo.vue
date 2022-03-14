<template>
  <div>
    <ButtonLink
      :link="link"
      text="View Tweet"
      icon="mdi-twitter"
    />

    <ButtonLink
      :link="blockExplorer"
      text="View Transaction"
      icon="mdi-link-lock"
    />
  </div>
</template>

<script>
import config from '../web3/config'

export default {
  name: 'SavedTweetInfo',
  computed: {
    link () {
      const trxId = this.$store.state.twitter.tweetAlreadySaved || this.$store.state.arweave.id
      return `${config.arweaveNet}/${trxId}`
    },
    blockExplorer () {
      const trxId = this.$store.state.twitter.tweetAlreadySaved || this.$store.state.arweave.id
      return `${config.blockExplorer}/${trxId}`
    }
  }
}

</script>
