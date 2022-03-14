const localStorageKeys = {
  transactionId: 'transactionId'
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
const setTranscationId = (id) => {
  setItem(localStorageKeys.transactionId, id)
}

const getTranscationId = () => {
  return getItem(localStorageKeys.transactionId)
}

const removeTransactionId = () => {
  removeItem(localStorageKeys.transactionId)
}

export default {
  transactionId: {
    set: setTranscationId,
    get: getTranscationId,
    remove: removeTransactionId
  }
}
