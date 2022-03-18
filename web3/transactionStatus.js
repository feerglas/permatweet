import Arweave from 'arweave'
import delay from '../helpers/promisedDelay'
import { config } from './config'

export default async (trxId, store) => {
  const arweave = Arweave.init(config.arweave)
  let confirmations = 0

  try {
    // get status and check confirmations
    const getStatus = async id => await arweave.transactions.getStatus(id)

    // recursively call until enough block confirmation reached
    const _checkStatus = async () => {
      if (store.state.restart.restarting) {
        store.commit('restart/restarting', false)

        return false
      }

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
    throw (new Error(e))
  }
}
