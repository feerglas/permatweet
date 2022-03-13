import Arweave from 'arweave'
import ArDB from 'ardb'
import config from './config'

const arweave = Arweave.init(config.arweave)
const ardb = new ArDB(arweave)

export const getAllTransactions = async () => {
  try {
    const transactions = await ardb.search('transactions').appName(config.transaction.tags['App-Name']).findAll()

    return transactions
  } catch (err) {
    console.error('graph-ql failed in getAllTransactions')
    return false
  }
}
