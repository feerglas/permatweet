import Arweave from 'arweave'

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const storeOnArweave = async (data) => {
  try {
    const arweave = Arweave.init({})

    // create transaction
    const transaction = await arweave.createTransaction({
      data: JSON.stringify(data)
    })

    // add tags
    transaction.addTag('permaweb-intend', 'saved-tweet')

    // sign transaction
    await arweave.transactions.sign(transaction)

    // get transaction id
    const trxId = transaction.id

    // post transaction
    const response = await arweave.transactions.post(transaction)

    // check post response
    if (response.status !== 200) {
      console.log('-->> arweave: will abort with current transaction. error message will follow')
      console.log(transaction)

      throw (new Error('wrong status code after posting the transaction, will abort'))
    }

    return trxId
  } catch (e) {
    console.log('-->> arweave: error while handling storeOnArweave')
    console.log(e)

    return false
  }
}

export const checkStatus = async (trxId) => {
  const arweave = Arweave.init({})

  try {
    // get status and check confirmations
    const getStatus = async id => await arweave.transactions.getStatus(id)

    let status = await getStatus(trxId)

    // recursively call until enough block confirmation reached
    const checkStatus = async () => {
      status = await getStatus(trxId)

      if (status.status !== 200 || status.confirmed === null) {
        console.log('-->> arweave: will abort loop and call the recursion again, since status message is still not 200')
        console.log(status)

        await delay(4000)
        return await checkStatus()
      }

      const confirmations = status.confirmed.number_of_confirmations

      if (status.confirmed.number_of_confirmations > 3) {
        console.log('-->> arweave: reached enough block confirmations, will finish with success')
        console.log(status)

        return true
      }

      console.log(`-->> arweave: still waiting for block confirmations. number of confirmations: ${confirmations}`)
      console.log(status)

      await delay(2000)
      return await checkStatus()
    }

    console.log('-->> arweave: going into loop now and wait for enough block confirmations')

    return await checkStatus()
  } catch (e) {

  }
}
