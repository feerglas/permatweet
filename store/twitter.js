export const state = () => ({
  fetchError: false,
  fetching: false,
  tweetContent: false
})

export const mutations = {
  fetchError (state, error) {
    state.fetchError = error
  },
  fetching (state, isFetching) {
    state.fetching = isFetching
  },
  tweetContent (state, content) {
    state.tweetContent = content
  }
}
