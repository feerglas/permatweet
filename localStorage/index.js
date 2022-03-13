const localStorageKeys = {
  transactionId: 'transactionId'
}

export const setTranscationId = (id) => {
  if (!process.browser) {
    return
  }

  if (!id) {
    return
  }

  window.localStorage.setItem(localStorageKeys.transactionId, id)
}

export const getTranscationId = () => {
  if (!process.browser) {
    return false
  }

  return window.localStorage.getItem(localStorageKeys.transactionId)
}

export const removeTransactionId = () => {
  if (!process.browser) {
    return false
  }

  window.localStorage.removeItem(localStorageKeys.transactionId)
}
