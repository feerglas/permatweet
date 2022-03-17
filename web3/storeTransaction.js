import Arweave from 'arweave'
import config from './config'

export default async (data, tweetId, tweetData) => {
  try {
    const arweave = Arweave.init(config.arweave)

    // create transaction
    const transaction = await arweave.createTransaction({
      data
    })

    // add tags
    config.transaction.tags['Tweet-Id'] = tweetId
    config.transaction.tags['Tweet-Saved-Date'] = (new Date()).getTime()
    config.transaction.tags['Tweet-Created-Date'] = (new Date(tweetData.data.created_at)).getTime()
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

    throw (new Error(e))
  }
}
