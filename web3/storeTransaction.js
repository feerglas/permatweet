import Arweave from 'arweave'
import anonymiseTweetData from '../helpers/anonymiseTweetData'
import {
  config,
  transactionTagKeys
} from './config'

export default async (data, tweetId, _tweetData) => {
  try {
    const arweave = Arweave.init(config.arweave)

    // create transaction
    const transaction = await arweave.createTransaction({ data })

    // anonymise tweet data
    // we should not mutate vuex store outside of mutation handlers
    const tweetData = anonymiseTweetData(JSON.parse(JSON.stringify(_tweetData)))

    // add tags
    config.transaction.tags[transactionTagKeys.tweetId] = tweetId
    config.transaction.tags[transactionTagKeys.tweetSavedDate] = (new Date()).getTime()
    config.transaction.tags[transactionTagKeys.tweetCreatedDate] = (new Date(tweetData.data.created_at)).getTime()
    config.transaction.tags[transactionTagKeys.tweetAuthorId] = tweetData.data.author_id
    config.transaction.tags[transactionTagKeys.tweetAuthorName] = tweetData.includes.users[0].name
    config.transaction.tags[transactionTagKeys.tweetContentPreview] = tweetData.data.text.substring(0, 10)

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
