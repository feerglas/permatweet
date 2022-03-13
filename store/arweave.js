export const state = () => ({
  confirmations: 0,
  confirming: false,
  confirmed: false,
  storing: false,
  id: false,
  error: false
})

export const mutations = {
  storing (state, isStoring) {
    state.storing = isStoring
  },
  confirming (state, isConfirming) {
    state.confirming = isConfirming
  },
  confirmed (state, isConfirmed) {
    state.confirmed = isConfirmed
  },
  id (state, trxId) {
    state.id = trxId
  },
  error (state, error) {
    state.error = error
  },
  setConfirmations (state, confirmations) {
    state.confirmations = confirmations
  }
}
