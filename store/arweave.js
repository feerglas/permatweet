export const state = () => ({
  storing: false,
  id: false,
  error: false
})

export const mutations = {
  storing (state, isStoring) {
    state.storing = isStoring
  },
  id (state, trxId) {
    state.id = trxId
  },
  error (state, error) {
    state.error = error
  }
}
