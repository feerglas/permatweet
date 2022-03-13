import Arweave from 'arweave'

const config = {
  transaction: {
    tags: {
      'permaweb-intend': 'saved-tweet',
      'app-version': '0.0.1',
      authors: [
        'Yves Tscherry',
        'Michael Zumstein'
      ],
      tweetId: ''
    },
    minAmountOfConfirmations: 3
  },
  requests: {
    retryDelay: 4000
  },
  arweave: {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
    logging: true
  }
}

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const storeOnArweave = async (data, tweetId) => {
  try {
    const arweave = Arweave.init(config.arweave)

    // create transaction
    const transaction = await arweave.createTransaction({
      data: JSON.stringify(data)
    })

    console.log('1 =====================')
    console.log('transaction created')
    console.log(transaction)

    // // add tags
    // config.transaction.tags.tweetId = tweetId
    // Object.keys(config.transaction.tags).forEach((key) => {
    //   const value = config.transaction.tags[key]
    //   transaction.addTag(key, value)
    // })

    // console.log('2 =====================')
    // console.log('added tags')
    // console.log(transaction)

    // // sign transaction
    // await arweave.transactions.sign(transaction)

    // console.log('3 =====================')
    // console.log('signed transaction')
    // console.log(transaction)

    // // get transaction id
    // const trxId = transaction.id

    // post transaction
    // const response = await arweave.transactions.post(transaction)

    // console.log('4 =====================')
    // console.log('transaction posted, got response')
    // console.log(transaction)

    // // check post response
    // if (response.status !== 200) {
    //   console.log('-->> arweave: will abort with current transaction. error message will follow')
    //   console.log(transaction)

    //   throw (new Error('wrong status code after posting the transaction, will abort'))
    // }

    // return trxId
  } catch (e) {
    console.log('-->> arweave: error while handling storeOnArweave')
    console.log(e)

    return false
  }
}

export const checkStatus = async (trxId, store) => {
  const arweave = Arweave.init(config.arweave)
  let confirmations = 0

  try {
    // get status and check confirmations
    const getStatus = async id => await arweave.transactions.getStatus(id)

    // recursively call until enough block confirmation reached
    const _checkStatus = async () => {
      const status = await getStatus(trxId)

      if (status.status !== 200 || status.confirmed === null) {
        console.log('-->> arweave: will abort loop and call the recursion again, since status message is still not 200')
        console.log(status)

        await delay(config.requests.retryDelay)
        return await _checkStatus()
      }

      const _confirmations = status.confirmed.number_of_confirmations

      if (_confirmations !== confirmations) {
        store.commit('arweave/setConfirmations', _confirmations)
        confirmations = _confirmations
      }

      if (_confirmations >= config.transaction.minAmountOfConfirmations) {
        console.log('-->> arweave: reached enough block confirmations, will finish with success')
        console.log(status)

        store.commit('arweave/confirmed', true)

        return true
      }

      console.log(`-->> arweave: still waiting for block confirmations. number of confirmations: ${_confirmations}`)
      console.log(status)

      await delay(config.requests.retryDelay)
      return await _checkStatus()
    }

    console.log('-->> arweave: going into loop now and wait for enough block confirmations')

    return await _checkStatus()
  } catch (e) {
    console.log('-->> arweave: error while checking confirmations')
    console.log(e)

    return false
  }
}
