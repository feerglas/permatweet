import Arweave from 'arweave'
import config from './config'

export default async (data, tweetId) => {
  try {
    const arweave = Arweave.init(config.arweave)

    // create transaction
    const transaction = await arweave.createTransaction({
      data: JSON.stringify(data)
    })

    // add tags
    config.transaction.tags['Tweet-Id'] = tweetId
    Object.keys(config.transaction.tags).forEach((key) => {
      const value = config.transaction.tags[key]
      transaction.addTag(key, value)
    })

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
