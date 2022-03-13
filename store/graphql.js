export const state = () => ({
  queryingTrxCount: false,
  trxCount: 0
})

export const mutations = {
  queryingTrxCount (state, isQuerying) {
    state.queryingTrxCount = isQuerying
  },
  trxCount (state, count) {
    state.trxCount = count
  }
}
