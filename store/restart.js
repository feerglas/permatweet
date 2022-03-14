export const state = () => ({
  restarting: false
})

export const mutations = {
  restarting (state, restart) {
    state.restarting = restart
  }
}
