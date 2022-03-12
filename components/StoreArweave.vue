<template>
  <v-btn
    elevation="2"
    large
    x-large
    @click="store"
  >
    Store tweet
  </v-btn>
</template>

<script>
import { storeOnArweave } from '../web3/arweave'

export default {
  name: 'StoreArweave',
  methods: {
    async store () {
      const sampleData = {
        foo: {
          bar: 'baz'
        }
      }

      try {
        const trxId = await storeOnArweave(sampleData)

        console.log(trxId)
      } catch (e) {
        console.log(e)
      }
    }
  }
}

</script>
