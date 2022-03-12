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
import Arweave from 'arweave'

export default {
  name: 'StoreArweave',
  methods: {
    async store () {
      const arweave = Arweave.init({})

      const sampleData = {
        foo: {
          bar: 'baz'
        }
      }

      // create transaction
      const transaction = await arweave.createTransaction({
        data: JSON.stringify(sampleData)
      })

      // add tags
      transaction.addTag('permaweb-intend', 'saved-tweet')

      // sign transaction
      await arweave.transactions.sign(transaction)

      // get transaction id
      const trxId = transaction.id
      console.log(trxId)

      // post transaction
      const response = await arweave.transactions.post(transaction)

      // check post response
      if (response.status !== 200) {
        console.log('error posting the transaction')

        return
      }

      // get status and check confirmations
      const getStatus = async id => await arweave.transactions.getStatus(id)

      let status = await getStatus(trxId)

      if (status.status !== 200) {
        console.log('error in status')
        console.log(status)
        return
      }

      console.log(status)

      function delay (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

      async function checkStatus () {
        status = await getStatus(trxId)
        const confirmations = status.confirmed.number_of_confirmations

        if (status.status !== 200) {
          return false
        }

        if (status.confirmed.number_of_confirmations > 15) {
          return true
        }

        console.log(`checking... number of confirmations: ${confirmations}`)

        await delay(1000)
        return await checkStatus()
      }

      const confirmationStatus = await checkStatus()

      console.log('CONFIRMED', confirmationStatus)
    }
  }
}

</script>
