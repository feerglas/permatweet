const localStorageKeys = {
  transactionId: 'transactionId',
  tweetId: 'tweetId'
}

// ==========================================
// Generic local storage handling
// ==========================================
const setItem = (item, value) => {
  if (!process.browser) {
    return
  }

  if (!value) {
    return
  }

  window.localStorage.setItem(item, value)
}

const getItem = (item) => {
  if (!process.browser) {
    return false
  }

  return window.localStorage.getItem(item)
}

const removeItem = (item) => {
  if (!process.browser) {
    return false
  }

  window.localStorage.removeItem(item)
}

// ==========================================
// transactionId
// ==========================================
const setTransactionId = (id) => {
  setItem(localStorageKeys.transactionId, id)
}

const getTransactionId = () => {
  return getItem(localStorageKeys.transactionId)
}

const removeTransactionId = () => {
  removeItem(localStorageKeys.transactionId)
}

// ==========================================
// tweetId
// ==========================================
const setTweetId = (id) => {
  setItem(localStorageKeys.tweetId, id)
}

const getTweetId = () => {
  return getItem(localStorageKeys.tweetId)
}

const removeTweetId = () => {
  removeItem(localStorageKeys.tweetId)
}

export default {
  transactionId: {
    set: setTransactionId,
    get: getTransactionId,
    remove: removeTransactionId
  },
  tweetId: {
    set: setTweetId,
    get: getTweetId,
    remove: removeTweetId
  }
}
