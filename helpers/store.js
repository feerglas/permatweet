export const resetTwitter = (store) => {
  store.commit('twitter/fetchError', false)
  store.commit('twitter/fetching', false)
  store.commit('twitter/tweetContentDocument', false)
  store.commit('twitter/tweetContentComponent', false)
  store.commit('twitter/tweetData', false)
  store.commit('twitter/tweetId', false)
  store.commit('twitter/tweetAlreadySaved', false)
}

export const resetGraphql = (store) => {
  store.commit('graphql/trxCount', 0)
  store.commit('graphql/queryingTrxCount', false)
}

export const resetArweave = (store) => {
  store.commit('arweave/setConfirmations', 0)
  store.commit('arweave/storing', false)
  store.commit('arweave/confirming', false)
  store.commit('arweave/confirmed', false)
  store.commit('arweave/id', false)
  store.commit('arweave/error', true)
}

export const resetRestart = (store) => {
  store.commit('restart/restarting', true)
}

export const resetAll = (store) => {
  resetTwitter(store)
  resetGraphql(store)
  resetArweave(store)
  resetRestart(store)
}
