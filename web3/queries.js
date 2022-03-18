/*
GraphQL Playground for Arweave: https://arweave.net/graphql
Documentation for ArDB: https://github.com/textury/ardb
Arweave GraphQl Api: https://gql-guide.vercel.app/
*/

import Arweave from 'arweave'
import ArDB from 'ardb'
import {
  config,
  transactionTagKeys
} from './config'

const arweave = Arweave.init(config.arweave)
const ardb = new ArDB(arweave)

// tags from transaction is an array of objects:
// {name: 'App-Name', value: 'permatweet'}.
// We make an object: { App-Name: 'permatweet'}
const mapTransactionTagsToObject = (tags) => {
  const tagsObject = {}

  tags.forEach((tag) => {
    tagsObject[tag.name] = tag.value
  })

  return tagsObject
}

const validateTags = (transactions) => {
  const validated = []

  transactions.forEach((transaction) => {
    const keys = Object.keys(transaction.tags)
    const hasId = keys.includes(transactionTagKeys.tweetId)
    const hasDateCreated = keys.includes(transactionTagKeys.tweetCreatedDate)
    const hasDateSaved = keys.includes(transactionTagKeys.tweetSavedDate)
    const hasAuthorId = keys.includes(transactionTagKeys.tweetAuthorId)
    const hasAuthorName = keys.includes(transactionTagKeys.tweetAuthorName)
    const hasContentPreview = keys.includes(transactionTagKeys.tweetContentPreview)

    if (hasId && hasDateCreated && hasDateSaved && hasAuthorId && hasAuthorName && hasContentPreview) {
      return validated.push(transaction)
    }
  })

  return validated
}

export const getAllTransactions = async () => {
  try {
    const transactions = await ardb.search('transactions').appName(config.transaction.tags['App-Name']).findAll()

    transactions.forEach((transaction) => {
      const { _tags } = transaction

      if (_tags) {
        transaction._tags = mapTransactionTagsToObject(_tags)
      }
    })

    return validateTags(transactions)
  } catch (err) {
    console.error('graph-ql failed in getAllTransactions')
    console.log(err)
    return false
  }
}
