<template>
  <div>
    saved tweets: 0
  </div>
</template>

<script>
import Arweave from 'arweave'
import ArDB from 'ardb'

const arweave = Arweave.init()
const ardb = new ArDB(arweave)

export default {
  name: 'SavedTweetsCount',
  async mounted () {
    try {
      const tx = await ardb.search('transaction').id('wdvU5aHM1bLjPuygO9UmS8GOeXHae6dPPStJqyZ0DIA').findOne()

      const appName = await ardb.search('transactions').appName('SmartWeaveAction').findOne()

      console.log(tx)
      console.log(appName)
    } catch (err) {
      console.error('GraphQL query failed')
      throw new Error(err)
    }
  }
}

</script>
